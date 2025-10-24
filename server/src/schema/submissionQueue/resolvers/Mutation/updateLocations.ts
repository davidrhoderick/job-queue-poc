import { buildJobId } from "../../../../lib/build-job-id";
import { jobStatus } from "../../../../lib/job-status";
import { submissionsQueue } from "../../../../lib/submissions-queue";
import type { MutationResolvers } from "./../../../../generated/types.generated";
export const updateLocations: NonNullable<
	MutationResolvers["updateLocations"]
> = async (_parent, { input }, _ctx) => {
	const { transactionId, coverageLocations = [] } = input;
	if (!transactionId) throw new Error("transactionId is required");

	const payload = {
		transactionId,
		coverageLocations,
	};

	const name = "updateLocations";
	const jobId = buildJobId(transactionId, name, payload, true);

	const job = await submissionsQueue.add(name, payload, { jobId });
	return jobStatus(job.id);
};
