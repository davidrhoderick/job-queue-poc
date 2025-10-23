import type { GraphQLFieldResolver } from "graphql";

type QuoteJobStatusArgs = {
	id: string;
};

type QuoteJobStatusResult = {
	id: string;
	status: "queued" | "processing" | "succeeded" | "failed";
	errorMessage?: string | null;
	finishedAt?: string | null;
	updatedAt: string;
};

export const quoteJobStatus: GraphQLFieldResolver<
	unknown,
	unknown,
	QuoteJobStatusArgs
> = async (_parent, { id }, _context) => {
	// Auth check (optional): ensure the caller can read this job

	const doc = await couchDb.get(id).catch(() => null);

	if (!doc) {
		throw new Error("Job not found");
	}

	return {
		id,
		status: doc.status,
		errorMessage: doc.error?.message ?? null,
		finishedAt: doc.finishedAt ?? null,
		updatedAt: doc.updatedAt,
	} satisfies QuoteJobStatusResult;
};
