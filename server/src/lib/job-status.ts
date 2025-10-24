import { Job } from "bullmq";
import { SubmissionStatus } from "../generated/types.generated";
import { submissionsQueue } from "./submissions-queue";

const nameToType = (name?: Job["name"]): SubmissionStatus["type"] =>
	name
		? ({
				createQualification: "CREATE_QUALIFICATION",
				quote: "QUOTE",
				updateAnswers: "UPDATE_ANSWERS",
				updateLocations: "UPDATE_LOCATIONS",
			}[name] as SubmissionStatus["type"])
		: "UNKNOWN";

export async function jobStatus(id: Job["id"]): Promise<SubmissionStatus> {
	if (!id)
		return {
			id: "undefined",
			type: "UNKNOWN",
			status: "NOT_FOUND" as SubmissionStatus["status"],
		};

	const job = await Job.fromId(submissionsQueue, id);
	const type = nameToType(job?.name);

	if (!job)
		return {
			id,
			type,
			status: "NOT_FOUND" as SubmissionStatus["status"],
		};

	const state = await job.getState();

	const base = { type, id };

	// eslint-disable-next-line default-case
	switch (state) {
		case "waiting":
			return { ...base, status: "QUEUED" as SubmissionStatus["status"] };
		case "active":
			return { ...base, status: "IN_PROGRESS" as SubmissionStatus["status"] };
		case "completed":
			return {
				...base,
				status: "SUCCESS" as SubmissionStatus["status"],
				data: job.returnvalue,
			};
		case "failed":
			return {
				...base,
				status: "FAIL" as SubmissionStatus["status"],
				errors: [
					{
						message: job.failedReason,
					},
				],
			};
	}

	return { ...base, status: "UNKNOWN" as SubmissionStatus["status"] };
}
