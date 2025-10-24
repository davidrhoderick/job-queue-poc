import { Job, type JobsOptions, Queue } from "bullmq";
import { Redis } from "ioredis";
import crypto from "node:crypto";
import {
	CreateQualificationInput,
	QuoteInput,
	UpdateAnswersInput,
	UpdateLocationsInput,
} from "../generated/types.generated";

// Single ioredis connection you can reuse for your own keys (indexes, locks, etc.)
export const redis = new Redis("redis://localhost:6379", {
	// prod tip from docs: often disable offline queue for enqueueing paths
	enableOfflineQueue: false, // workers can keep default true
});

export const submissionsQueue = new Queue("submissions", {
	connection: redis,
});

const SUB_IDX = (submissionId: string) => `idx:submission:${submissionId}`;
const AGENCY_IDX = (agencyId: string) => `idx:agency:${agencyId}`;
const REQUEST_IDX = (requestId: string) => `idx:request:${requestId}`;

export type SubmissionJobData =
	| UpdateAnswersInput
	| UpdateLocationsInput
	| QuoteInput;

const defaultOpts: JobsOptions = {
	attempts: 3,
	backoff: { type: "exponential", delay: 1000 },
	removeOnComplete: { age: 7 * 24 * 3600, count: 5000 },
	removeOnFail: { age: 7 * 24 * 3600, count: 5000 },
};

const sha1 = (x: unknown) =>
	crypto.createHash("sha1").update(JSON.stringify(x)).digest("hex");

/**
 * Enqueue CREATE with requestId (no submissionId yet).
 * jobId pattern: requestId:create:<nonce>
 */
export async function enqueueCreateSubmission(
	data: CreateQualificationInput & { requestId?: string },
	opts?: JobsOptions & { dedupe?: boolean },
) {
	const nonce = opts?.dedupe
		? crypto.createHash("sha1").update(JSON.stringify(data)).digest("hex")
		: crypto.randomUUID();

	const jobId = `${data.requestId}:create:${nonce}`;
	const now = Date.now();

	const job = await submissionsQueue.add("createQualification", data, {
		...defaultOpts,
		jobId,
		...opts,
	});

	// Provisional indexes: request + agency
	await redis
		.pipeline()
		// @ts-expect-error this is correct but the overload breaks it
		.zadd(REQUEST_IDX(data.requestId), now, job.id!)
		.zadd(AGENCY_IDX(data.agencyId), now, job.id!)
		.hset(`jobmeta:${job.id!}`, {
			requestId: data.requestId,
			agencyId: data.agencyId,
		})
		.exec();

	return job;
}

// Enqueue + index (ZSET) atomically with a pipeline
export async function enqueueSubmissionJob<
	N extends "updateAnswers" | "updateLocation" | "quote",
>(name: N, data: SubmissionJobData, opts?: JobsOptions & { dedupe?: boolean }) {
	const nonce = opts?.dedupe ? sha1(data ?? "") : crypto.randomUUID();
	const jobId = `${data.transactionId}:${name}:${nonce}`;
	const now = Date.now();

	const job = await submissionsQueue.add(name, data, {
		...defaultOpts,
		jobId,
		...opts,
	});

	await redis
		.pipeline()
		// @ts-expect-error this is correct but the overload breaks it
		.zadd(SUB_IDX(data.transactionId), now, job.id) // ZSET: score=time, value=jobId
		.exec();

	return job;
}

// Access pattern 1: latest "burst" for one submission,
// walk newest→older until we hit a decisive state (active|completed|failed)
type TargetStopState = "active" | "completed" | "failed";

export async function getSubmissionLatestBurst(
	submissionId: string,
	{
		stopOn = new Set<TargetStopState>(["active", "completed", "failed"]),
		pageSize = 20,
		maxJobs = 200,
	}: {
		stopOn?: Set<TargetStopState>;
		pageSize?: number;
		maxJobs?: number;
	} = {},
) {
	const out: Job[] = [];
	let start = 0;

	while (out.length < maxJobs) {
		const end = start + pageSize - 1;
		const ids = await redis.zrevrange(SUB_IDX(submissionId), start, end); // newest first
		if (ids.length === 0) break;

		for (const id of ids) {
			const j = await Job.fromId(submissionsQueue, id); // hydrate by ID
			if (!j) continue;
			out.push(j);
			const state = await j.getState();
			if (stopOn.has(state as TargetStopState)) return out;
			if (out.length >= maxJobs) return out;
		}
		start += pageSize;
	}
	return out;
}

// Access pattern 2: bulk for many submissions (IDs from your DB view)
export async function getSubmissionsLatestBurstBulk(
	submissionIds: string[],
	{
		stopOn = new Set<TargetStopState>(["active", "completed", "failed"]),
		headCountPerSubmission = 30,
	}: {
		stopOn?: Set<TargetStopState>;
		headCountPerSubmission?: number;
	} = {},
) {
	// 1) Pull top N jobIds per submission via pipeline
	const pipe = redis.pipeline();
	for (const sid of submissionIds) {
		pipe.zrevrange(SUB_IDX(sid), 0, headCountPerSubmission - 1);
	}
	const ranges = (await pipe.exec()) as Array<[Error | null, string[]]>;

	// 2) Walk each submission's IDs until decisive state
	const result: Record<string, Job[]> = {};
	for (let i = 0; i < submissionIds.length; i++) {
		const sid = submissionIds[i];
		const ids = ranges[i]?.[1] ?? [];
		const burst: Job[] = [];

		for (const id of ids) {
			const j = await Job.fromId(submissionsQueue, id);
			if (!j) continue;
			burst.push(j);
			const state = await j.getState();
			if (stopOn.has(state as TargetStopState)) break;
		}
		result[sid] = burst;
	}
	return result;
}
