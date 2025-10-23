import type { GraphQLFieldResolver } from "graphql";

type CreateQuoteJobArgs = {
	input: {
		quoteId: string;
		payload?: Record<string, unknown>;
	};
};

type CreateQuoteJobResult = {
	jobId: string;
	status: "queued";
};

export const createQuoteJob: GraphQLFieldResolver<
	unknown,
	unknown,
	CreateQuoteJobArgs
> = async (_parent, { input }, context) => {
	// Do auth check here (e.g., context.user). Throw if unauthorized.
	// if (!context.user) throw new Error("Unauthorized");

	const result = await couchDb.insert({
		type: "quote_job",
		status: "queued" as const,
		quoteId: input.quoteId,
		payload: input.payload ?? null,
		attempts: 0,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});

	// call actual PC API call lib function (job ID)

	return {
		jobId: result.id,
		status: "queued",
	} satisfies CreateQuoteJobResult;
};
