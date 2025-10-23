import { getJobState, queue } from "../Query/operationStatus";
import type { MutationResolvers } from "../../../../generated/types.generated";
import { Worker } from "bullmq";

const testWorker = new Worker(
	"test",
	async (job) => {
		const delayMs = job.data.duration * 1000;

		await new Promise((resolve) => {
			setTimeout(resolve, delayMs);
		});

		if (job.data.shouldFail)
			throw new Error("Failing on purpose because shouldFail=true");

		return {
			anything: "we want to return",
		};
	},
	{
		connection: { host: "localhost", port: 6379 },
	},
);

export const testOperationStatus: NonNullable<
	MutationResolvers["testOperationStatus"]
> = async (_parent, { input: { duration, shouldFail } }) => {
	const job = await queue.add("operation", { duration, shouldFail });

	return getJobState(job.id);
};
