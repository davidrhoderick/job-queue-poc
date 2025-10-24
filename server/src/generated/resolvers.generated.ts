/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { submissionStatus as Query_submissionStatus } from "./../schema/submissionQueue/resolvers/Query/submissionStatus";
import { createQualification as Mutation_createQualification } from "./../schema/submissionQueue/resolvers/Mutation/createQualification";
import { quote as Mutation_quote } from "./../schema/submissionQueue/resolvers/Mutation/quote";
import { updateAnswers as Mutation_updateAnswers } from "./../schema/submissionQueue/resolvers/Mutation/updateAnswers";
import { updateLocations as Mutation_updateLocations } from "./../schema/submissionQueue/resolvers/Mutation/updateLocations";
import { CoverageLocation } from "./../schema/submissionQueue/resolvers/CoverageLocation";
import { PolicyPeriod } from "./../schema/submissionQueue/resolvers/PolicyPeriod";
import { PrimaryInsured } from "./../schema/submissionQueue/resolvers/PrimaryInsured";
import { QuestionAnswer } from "./../schema/submissionQueue/resolvers/QuestionAnswer";
import { SubmissionStatus } from "./../schema/submissionQueue/resolvers/SubmissionStatus";
import { UserError } from "./../schema/submissionQueue/resolvers/UserError";
export const resolvers: Resolvers = {
	Query: { submissionStatus: Query_submissionStatus },
	Mutation: {
		createQualification: Mutation_createQualification,
		quote: Mutation_quote,
		updateAnswers: Mutation_updateAnswers,
		updateLocations: Mutation_updateLocations,
	},

	CoverageLocation: CoverageLocation,
	PolicyPeriod: PolicyPeriod,
	PrimaryInsured: PrimaryInsured,
	QuestionAnswer: QuestionAnswer,
	SubmissionStatus: SubmissionStatus,
	UserError: UserError,
};
