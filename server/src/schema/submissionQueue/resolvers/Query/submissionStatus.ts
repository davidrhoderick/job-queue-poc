import type { QueryResolvers } from "./../../../../generated/types.generated";
import { jobStatus } from "../../../../lib/job-status";
export const submissionStatus: NonNullable<
	QueryResolvers["submissionStatus"]
> = async (_parent, { id }, _ctx) => {
	return jobStatus(id);
};
