import { Job, Worker } from "bullmq";
import { redis } from "./submissions-queue";
import { PolicyPeriod } from "../generated/types.generated";

const delay = async (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

const fakePolicyPeriod =(input: Partial<PolicyPeriod>): PolicyPeriod =>{
	return {
		transactionId:
			input.transactionId ?? `tx-${Math.random().toString(36).slice(2)}`,
		agencyId: input.agencyId ?? `agency-${Math.floor(Math.random() * 1000)}`,
		primaryInsured: input.primaryInsured ?? {
			firstName: "John",
			lastName: "Doe",
			fein: "12-3456789",
		},
		questionAnswers: input.questionAnswers ?? [],
		coverageLocations: input.coverageLocations ?? [],
		premium: input.premium ?? null,
	};
}

const withTransactionLock = async <T>(
	txId: string,
	fn: () => Promise<T>,
): Promise<T> => {
	const key = `lock:tx:${txId}`;
	const ttl = 15_000;
	const ok = await redis.set(key, "1", "PX", ttl, "NX");
	if (!ok) throw new Error("Transaction is busy; please retry.");
	try {
		return await fn();
	} finally {
		await redis.del(key).catch(() => {});
	}
}

const calculatePremium = (pp: PolicyPeriod): number => {
	return (
		500 +
		(pp.questionAnswers?.length ?? 0) * 25 +
		(pp.coverageLocations?.length ?? 0) * 50
	);
}

export const submissionsWorker = new Worker(
	"submissions",
	async (job: Job) => {
		const { transactionId = `tx-${job.id}` } = job.data as {
			transactionId?: string;
		};

		// add artificial delay to simulate real processing
		await job.updateProgress({ step: "starting" });
		await delay(300); // small delay for realism

		switch (job.name) {
			case "createQualification": {
				return withTransactionLock(transactionId, async () => {
					await delay(10000);

					return fakePolicyPeriod({
						transactionId,
						agencyId: job.data.agencyId,
						primaryInsured: {
							firstName: job.data.primaryInsured?.firstName ?? "John",
							lastName: job.data.primaryInsured?.lastName ?? "Doe",
							fein: job.data.primaryInsured?.fein ?? "00-0000000",
						},
					});
				});
			}

			case "updateAnswers": {
				return withTransactionLock(transactionId, async () => {
					await delay(8000);

					return fakePolicyPeriod({
						transactionId,
						questionAnswers: job.data.questionAnswers ?? [],
					});
				});
			}

			case "updateLocations": {
				return withTransactionLock(transactionId, async () => {
					await delay(8000);

					return fakePolicyPeriod({
						transactionId,
						coverageLocations: job.data.coverageLocations ?? [],
					});
				});
			}

			case "quote": {
				return withTransactionLock(transactionId, async () => {
					await delay(30000);

					const base = fakePolicyPeriod({ transactionId });
					const premium = calculatePremium(base);

					return { ...base, premium };
				});
			}

			default:
				return { message: `No handler for job type: ${job.name}` };
		}
	},
	{ connection: redis },
);
