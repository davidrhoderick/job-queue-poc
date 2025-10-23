import { getJobState, queue } from "../Query/operationStatus";
import type { MutationResolvers } from "../../../../generated/types.generated";
export const testOperationStatus: NonNullable<
	MutationResolvers["testOperationStatus"]
> = async (_parent, { input: { duration, shouldFail } }) => {
	const job = await queue.add("operation", { duration, shouldFail });

	return getJobState(job.id);
};
