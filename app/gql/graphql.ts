/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type CoverageLocation = {
	__typename?: "CoverageLocation";
	city?: Maybe<Scalars["String"]["output"]>;
	state: Scalars["String"]["output"];
	streetAddress1?: Maybe<Scalars["String"]["output"]>;
	streetAddress2?: Maybe<Scalars["String"]["output"]>;
	zipCode?: Maybe<Scalars["String"]["output"]>;
};

export type CoverageLocationInput = {
	city?: InputMaybe<Scalars["String"]["input"]>;
	state: Scalars["String"]["input"];
	streetAddress1?: InputMaybe<Scalars["String"]["input"]>;
	streetAddress2?: InputMaybe<Scalars["String"]["input"]>;
	zipCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateQualificationInput = {
	agencyId: Scalars["String"]["input"];
	fein: Scalars["String"]["input"];
	firstName: Scalars["String"]["input"];
	lastName: Scalars["String"]["input"];
	transactionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type Mutation = {
	__typename?: "Mutation";
	createQualification: SubmissionStatus;
	quote: SubmissionStatus;
	updateAnswers: SubmissionStatus;
	updateLocations: SubmissionStatus;
};

export type MutationCreateQualificationArgs = {
	input: CreateQualificationInput;
};

export type MutationQuoteArgs = {
	input: QuoteInput;
};

export type MutationUpdateAnswersArgs = {
	input: UpdateAnswersInput;
};

export type MutationUpdateLocationsArgs = {
	input: UpdateLocationsInput;
};

export type PolicyPeriod = {
	__typename?: "PolicyPeriod";
	agencyId: Scalars["String"]["output"];
	coverageLocations?: Maybe<Array<Maybe<CoverageLocation>>>;
	premium?: Maybe<Scalars["Float"]["output"]>;
	primaryInsured: PrimaryInsured;
	questionAnswers?: Maybe<Array<Maybe<QuestionAnswer>>>;
	transactionId: Scalars["String"]["output"];
};

export type PrimaryInsured = {
	__typename?: "PrimaryInsured";
	fein: Scalars["String"]["output"];
	firstName: Scalars["String"]["output"];
	lastName: Scalars["String"]["output"];
};

export type Query = {
	__typename?: "Query";
	submissionStatus: SubmissionStatus;
};

export type QuerySubmissionStatusArgs = {
	id: Scalars["String"]["input"];
};

export type QuestionAnswer = {
	__typename?: "QuestionAnswer";
	answer: Scalars["String"]["output"];
	questionId: Scalars["String"]["output"];
};

export type QuestionAnswerInput = {
	answer: Scalars["String"]["input"];
	questionId: Scalars["String"]["input"];
};

export type QuoteInput = {
	transactionId: Scalars["String"]["input"];
};

export type SubmissionStatus = {
	__typename?: "SubmissionStatus";
	data?: Maybe<PolicyPeriod>;
	errors?: Maybe<Array<Maybe<UserError>>>;
	id: Scalars["String"]["output"];
	status: SubmissionStatusEnum;
	type: SubmissionType;
};

export enum SubmissionStatusEnum {
	Fail = "FAIL",
	InProgress = "IN_PROGRESS",
	NotFound = "NOT_FOUND",
	Queued = "QUEUED",
	Success = "SUCCESS",
	Unknown = "UNKNOWN",
}

export enum SubmissionType {
	CreateQualification = "CREATE_QUALIFICATION",
	Quote = "QUOTE",
	Unknown = "UNKNOWN",
	UpdateAnswers = "UPDATE_ANSWERS",
	UpdateLocations = "UPDATE_LOCATIONS",
}

export type UpdateAnswersInput = {
	questionAnswers?: InputMaybe<Array<InputMaybe<QuestionAnswerInput>>>;
	transactionId: Scalars["String"]["input"];
};

export type UpdateLocationsInput = {
	coverageLocations?: InputMaybe<Array<InputMaybe<CoverageLocationInput>>>;
	transactionId: Scalars["String"]["input"];
};

export type UserError = {
	__typename?: "UserError";
	message: Scalars["String"]["output"];
	path?: Maybe<Scalars["String"]["output"]>;
};

export type CreateQualificationMutationVariables = Exact<{
	input: CreateQualificationInput;
}>;

export type CreateQualificationMutation = {
	__typename?: "Mutation";
	createQualification: {
		__typename?: "SubmissionStatus";
		id: string;
		status: SubmissionStatusEnum;
	};
};

export type SubmissionStatusQueryVariables = Exact<{
	id: Scalars["String"]["input"];
}>;

export type SubmissionStatusQuery = {
	__typename?: "Query";
	submissionStatus: {
		__typename?: "SubmissionStatus";
		id: string;
		status: SubmissionStatusEnum;
		data?: {
			__typename?: "PolicyPeriod";
			agencyId: string;
			primaryInsured: {
				__typename?: "PrimaryInsured";
				firstName: string;
				lastName: string;
				fein: string;
			};
			questionAnswers?: Array<{
				__typename?: "QuestionAnswer";
				questionId: string;
				answer: string;
			} | null> | null;
			coverageLocations?: Array<{
				__typename?: "CoverageLocation";
				state: string;
				streetAddress1?: string | null;
				streetAddress2?: string | null;
				city?: string | null;
				zipCode?: string | null;
			} | null> | null;
		} | null;
		errors?: Array<{
			__typename?: "UserError";
			message: string;
			path?: string | null;
		} | null> | null;
	};
};

export const CreateQualificationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "CreateQualification" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "input" },
					},
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "CreateQualificationInput" },
						},
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "createQualification" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "input" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "input" },
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "status" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	CreateQualificationMutation,
	CreateQualificationMutationVariables
>;
export const SubmissionStatusDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "SubmissionStatus" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "submissionStatus" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "id" },
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "status" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "data" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "primaryInsured" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "firstName" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "lastName" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "fein" },
														},
													],
												},
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "questionAnswers" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "questionId" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "answer" },
														},
													],
												},
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "coverageLocations" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "state" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "streetAddress1" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "streetAddress2" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "city" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "zipCode" },
														},
													],
												},
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "agencyId" },
											},
										],
									},
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "errors" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "message" },
											},
											{ kind: "Field", name: { kind: "Name", value: "path" } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	SubmissionStatusQuery,
	SubmissionStatusQueryVariables
>;
