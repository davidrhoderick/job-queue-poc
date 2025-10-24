import type { MutationResolvers } from "./../../../../generated/types.generated";
import { submissionsQueue } from "../../../../lib/submissions-queue";
import crypto from "node:crypto";
import { jobStatus } from "../../../../lib/job-status";
import { buildJobId } from "../../../../lib/build-job-id";

export const createQualification: NonNullable<
	MutationResolvers["createQualification"]
> = async (_parent, { input }, _ctx) => {
	const { transactionId, firstName, lastName, fein, agencyId } = input;

	const payload = {
		primaryInsured: { firstName, lastName, fein },
		agencyId,
		transactionId,
	};

	const name = "createQualification";
	const jobId = buildJobId(
		transactionId ?? crypto.randomUUID(),
		name,
		payload,
		/*dedupe*/ true,
	);

	const job = await submissionsQueue.add(name, payload, { jobId });
	return jobStatus(job.id);
};
