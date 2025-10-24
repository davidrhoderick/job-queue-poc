import type { DocumentNode } from "graphql";
export const typeDefs = {
	kind: "Document",
	definitions: [
		{
			name: { kind: "Name", value: "Query" },
			kind: "ObjectTypeDefinition",
			fields: [
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "submissionStatus" },
					arguments: [
						{
							kind: "InputValueDefinition",
							name: { kind: "Name", value: "id" },
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "String" },
								},
							},
							directives: [],
						},
					],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "SubmissionStatus" },
						},
					},
					directives: [],
				},
			],
			directives: [],
			interfaces: [],
		},
		{
			name: { kind: "Name", value: "Mutation" },
			kind: "ObjectTypeDefinition",
			fields: [
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "createQualification" },
					arguments: [
						{
							kind: "InputValueDefinition",
							name: { kind: "Name", value: "input" },
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "CreateQualificationInput" },
								},
							},
							directives: [],
						},
					],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "SubmissionStatus" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "updateAnswers" },
					arguments: [
						{
							kind: "InputValueDefinition",
							name: { kind: "Name", value: "input" },
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "UpdateAnswersInput" },
								},
							},
							directives: [],
						},
					],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "SubmissionStatus" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "updateLocations" },
					arguments: [
						{
							kind: "InputValueDefinition",
							name: { kind: "Name", value: "input" },
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "UpdateLocationsInput" },
								},
							},
							directives: [],
						},
					],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "SubmissionStatus" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "quote" },
					arguments: [
						{
							kind: "InputValueDefinition",
							name: { kind: "Name", value: "input" },
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "QuoteInput" },
								},
							},
							directives: [],
						},
					],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "SubmissionStatus" },
						},
					},
					directives: [],
				},
			],
			directives: [],
			interfaces: [],
		},
		{
			kind: "InputObjectTypeDefinition",
			name: { kind: "Name", value: "CreateQualificationInput" },
			directives: [],
			fields: [
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "transactionId" },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "firstName" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "lastName" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "fein" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "agencyId" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "InputObjectTypeDefinition",
			name: { kind: "Name", value: "UpdateAnswersInput" },
			directives: [],
			fields: [
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "transactionId" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "questionAnswers" },
					type: {
						kind: "ListType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "QuestionAnswerInput" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "InputObjectTypeDefinition",
			name: { kind: "Name", value: "QuestionAnswerInput" },
			directives: [],
			fields: [
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "questionId" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "answer" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "InputObjectTypeDefinition",
			name: { kind: "Name", value: "UpdateLocationsInput" },
			directives: [],
			fields: [
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "transactionId" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "coverageLocations" },
					type: {
						kind: "ListType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "CoverageLocationInput" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "InputObjectTypeDefinition",
			name: { kind: "Name", value: "CoverageLocationInput" },
			directives: [],
			fields: [
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "state" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "streetAddress1" },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "streetAddress2" },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "city" },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "zipCode" },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
			],
		},
		{
			kind: "InputObjectTypeDefinition",
			name: { kind: "Name", value: "QuoteInput" },
			directives: [],
			fields: [
				{
					kind: "InputValueDefinition",
					name: { kind: "Name", value: "transactionId" },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "EnumTypeDefinition",
			name: { kind: "Name", value: "SubmissionType" },
			directives: [],
			values: [
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "CREATE_QUALIFICATION" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "UPDATE_ANSWERS" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "UPDATE_LOCATIONS" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "QUOTE" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "UNKNOWN" },
					directives: [],
				},
			],
		},
		{
			kind: "ObjectTypeDefinition",
			name: { kind: "Name", value: "SubmissionStatus" },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "id" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "type" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "SubmissionType" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "status" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "SubmissionStatusEnum" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "data" },
					arguments: [],
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "PolicyPeriod" },
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "errors" },
					arguments: [],
					type: {
						kind: "ListType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "UserError" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "EnumTypeDefinition",
			name: { kind: "Name", value: "SubmissionStatusEnum" },
			directives: [],
			values: [
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "QUEUED" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "IN_PROGRESS" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "SUCCESS" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "FAIL" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "NOT_FOUND" },
					directives: [],
				},
				{
					kind: "EnumValueDefinition",
					name: { kind: "Name", value: "UNKNOWN" },
					directives: [],
				},
			],
		},
		{
			kind: "ObjectTypeDefinition",
			name: { kind: "Name", value: "UserError" },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "message" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "path" },
					arguments: [],
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
			],
		},
		{
			kind: "ObjectTypeDefinition",
			name: { kind: "Name", value: "PolicyPeriod" },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "transactionId" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "primaryInsured" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "PrimaryInsured" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "questionAnswers" },
					arguments: [],
					type: {
						kind: "ListType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "QuestionAnswer" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "coverageLocations" },
					arguments: [],
					type: {
						kind: "ListType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "CoverageLocation" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "premium" },
					arguments: [],
					type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "agencyId" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "ObjectTypeDefinition",
			name: { kind: "Name", value: "PrimaryInsured" },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "firstName" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "lastName" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "fein" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "ObjectTypeDefinition",
			name: { kind: "Name", value: "QuestionAnswer" },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "questionId" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "answer" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
			],
		},
		{
			kind: "ObjectTypeDefinition",
			name: { kind: "Name", value: "CoverageLocation" },
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "state" },
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "streetAddress1" },
					arguments: [],
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "streetAddress2" },
					arguments: [],
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "city" },
					arguments: [],
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
				{
					kind: "FieldDefinition",
					name: { kind: "Name", value: "zipCode" },
					arguments: [],
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					directives: [],
				},
			],
		},
		{
			kind: "SchemaDefinition",
			operationTypes: [
				{
					kind: "OperationTypeDefinition",
					type: { kind: "NamedType", name: { kind: "Name", value: "Query" } },
					operation: "query",
				},
				{
					kind: "OperationTypeDefinition",
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "Mutation" },
					},
					operation: "mutation",
				},
			],
		},
	],
} as unknown as DocumentNode;
