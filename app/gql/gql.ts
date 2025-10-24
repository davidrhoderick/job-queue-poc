/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
	"\n  mutation CreateQualification($input: CreateQualificationInput!) {\n    createQualification(input: $input) {\n      id\n      status\n    }\n  }\n": typeof types.CreateQualificationDocument;
	"\n  mutation UpdateAnswers($input: UpdateAnswersInput!) {\n    updateAnswers(input: $input) {\n      id\n      status\n    }\n  }\n": typeof types.UpdateAnswersDocument;
	"\n  mutation UpdateLocations($input: UpdateLocationsInput!) {\n    updateLocations(input: $input) {\n      id\n      status\n    }\n  }\n": typeof types.UpdateLocationsDocument;
	"\n  query SubmissionStatus($id: String!) {\n    submissionStatus(id: $id) {\n      id\n      status\n\t\t\ttype\n\t\t\tdata {\n\t\t\t\ttransactionId\n\t\t\t\tprimaryInsured {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tfein\n\t\t\t\t}\n\t\t\t\tquestionAnswers {\n\t\t\t\t\tquestionId\n\t\t\t\t\tanswer\n\t\t\t\t}\n\t\t\t\tcoverageLocations {\n\t\t\t\t\tstate\n\t\t\t\t\tstreetAddress1\n\t\t\t\t\tstreetAddress2\n\t\t\t\t\tcity\n\t\t\t\t\tzipCode\n\t\t\t\t}\n\t\t\t\t\tagencyId\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tmessage\n\t\t\t\tpath\n\t\t\t}\n    }\n  }\n": typeof types.SubmissionStatusDocument;
};
const documents: Documents = {
	"\n  mutation CreateQualification($input: CreateQualificationInput!) {\n    createQualification(input: $input) {\n      id\n      status\n    }\n  }\n":
		types.CreateQualificationDocument,
	"\n  mutation UpdateAnswers($input: UpdateAnswersInput!) {\n    updateAnswers(input: $input) {\n      id\n      status\n    }\n  }\n":
		types.UpdateAnswersDocument,
	"\n  mutation UpdateLocations($input: UpdateLocationsInput!) {\n    updateLocations(input: $input) {\n      id\n      status\n    }\n  }\n":
		types.UpdateLocationsDocument,
	"\n  query SubmissionStatus($id: String!) {\n    submissionStatus(id: $id) {\n      id\n      status\n\t\t\ttype\n\t\t\tdata {\n\t\t\t\ttransactionId\n\t\t\t\tprimaryInsured {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tfein\n\t\t\t\t}\n\t\t\t\tquestionAnswers {\n\t\t\t\t\tquestionId\n\t\t\t\t\tanswer\n\t\t\t\t}\n\t\t\t\tcoverageLocations {\n\t\t\t\t\tstate\n\t\t\t\t\tstreetAddress1\n\t\t\t\t\tstreetAddress2\n\t\t\t\t\tcity\n\t\t\t\t\tzipCode\n\t\t\t\t}\n\t\t\t\t\tagencyId\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tmessage\n\t\t\t\tpath\n\t\t\t}\n    }\n  }\n":
		types.SubmissionStatusDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n  mutation CreateQualification($input: CreateQualificationInput!) {\n    createQualification(input: $input) {\n      id\n      status\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateQualification($input: CreateQualificationInput!) {\n    createQualification(input: $input) {\n      id\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n  mutation UpdateAnswers($input: UpdateAnswersInput!) {\n    updateAnswers(input: $input) {\n      id\n      status\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateAnswers($input: UpdateAnswersInput!) {\n    updateAnswers(input: $input) {\n      id\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n  mutation UpdateLocations($input: UpdateLocationsInput!) {\n    updateLocations(input: $input) {\n      id\n      status\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateLocations($input: UpdateLocationsInput!) {\n    updateLocations(input: $input) {\n      id\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n  query SubmissionStatus($id: String!) {\n    submissionStatus(id: $id) {\n      id\n      status\n\t\t\ttype\n\t\t\tdata {\n\t\t\t\ttransactionId\n\t\t\t\tprimaryInsured {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tfein\n\t\t\t\t}\n\t\t\t\tquestionAnswers {\n\t\t\t\t\tquestionId\n\t\t\t\t\tanswer\n\t\t\t\t}\n\t\t\t\tcoverageLocations {\n\t\t\t\t\tstate\n\t\t\t\t\tstreetAddress1\n\t\t\t\t\tstreetAddress2\n\t\t\t\t\tcity\n\t\t\t\t\tzipCode\n\t\t\t\t}\n\t\t\t\t\tagencyId\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tmessage\n\t\t\t\tpath\n\t\t\t}\n    }\n  }\n",
): (typeof documents)["\n  query SubmissionStatus($id: String!) {\n    submissionStatus(id: $id) {\n      id\n      status\n\t\t\ttype\n\t\t\tdata {\n\t\t\t\ttransactionId\n\t\t\t\tprimaryInsured {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tfein\n\t\t\t\t}\n\t\t\t\tquestionAnswers {\n\t\t\t\t\tquestionId\n\t\t\t\t\tanswer\n\t\t\t\t}\n\t\t\t\tcoverageLocations {\n\t\t\t\t\tstate\n\t\t\t\t\tstreetAddress1\n\t\t\t\t\tstreetAddress2\n\t\t\t\t\tcity\n\t\t\t\t\tzipCode\n\t\t\t\t}\n\t\t\t\t\tagencyId\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tmessage\n\t\t\t\tpath\n\t\t\t}\n    }\n  }\n"];

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
