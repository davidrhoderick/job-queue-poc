import type {
	QueryResolvers,
	OperationStatusEnum,
} from "./../../../types.generated";
import { Job, Queue } from "bullmq";

export const queue = new Queue("test", {
	connection: { host: "localhost", port: 6379 },
});

export const getJobState = async (id?: string) => {
	if (!id)
		return { id: "undefined", status: "NOT_FOUND" as OperationStatusEnum };

	const job = await Job.fromId(queue, id);

	if (!job) return { id, status: "NOT_FOUND" as OperationStatusEnum };

	const state = await job.getState();
	// eslint-disable-next-line default-case
	switch (state) {
		case "waiting":
			return {
				id,
				status: "QUEUED" as OperationStatusEnum,
			};
		case "active":
			return {
				id,
				status: "IN_PROGRESS" as OperationStatusEnum,
			};
		case "completed":
			return {
				id,
				status: "SUCCESS" as OperationStatusEnum,
				data: job.returnvalue,
			};
		case "failed":
			return {
				id,
				status: "FAIL" as OperationStatusEnum,
				errors: [
					{
						message: job.failedReason,
					},
				],
			};
	}

	return { id, status: "UNKNOWN" as OperationStatusEnum };
};

export const operationStatus: NonNullable<
	QueryResolvers["operationStatus"]
> = async (_parent, { id }) => getJobState(id);
