import type { QueryResolvers } from "./../../../types.generated";
import { Job, Queue } from "bullmq";

const queue = new Queue("test", {
	connection: { host: "localhost", port: 6379 },
});

export const operationStatus: NonNullable<
	QueryResolvers["operationStatus"]
> = async (_parent, { id }) => {
	const job = await Job.fromId(queue, id);

	if (!job) return { id, status: "NOT_FOUND" };

	const state = await job.getState();

	// eslint-disable-next-line default-case
	switch (state) {
		case "waiting":
			return {
				id,
				status: "QUEUED",
			};
		case "active":
			return {
				id,
				status: "IN_PROGRESS",
			};
		case "completed":
			return {
				id,
				status: "SUCCESS",
				data: job.returnvalue,
			};
		case "failed":
			return {
				id,
				status: "FAIL",
				errors: [
					{
						message: job.failedReason,
					},
				],
			};
	}

	return { id, status: "UNKNOWN" };
};
