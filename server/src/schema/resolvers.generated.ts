/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { operationStatus as Query_operationStatus } from "./operationQueue/resolvers/Query/operationStatus";
import { testOperationStatus as Mutation_testOperationStatus } from "./operationQueue/resolvers/Mutation/testOperationStatus";
import { Data } from "./operationQueue/resolvers/Data";
import { OperationStatus } from "./operationQueue/resolvers/OperationStatus";
import { UserError } from "./operationQueue/resolvers/UserError";
export const resolvers: Resolvers = {
	Query: { operationStatus: Query_operationStatus },
	Mutation: { testOperationStatus: Mutation_testOperationStatus },

	Data: Data,
	OperationStatus: OperationStatus,
	UserError: UserError,
};
