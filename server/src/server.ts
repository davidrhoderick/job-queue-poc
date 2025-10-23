import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";
import { typeDefs } from "./schema/typeDefs.generated";
import { resolvers } from "./schema/resolvers.generated";
import { Worker } from "bullmq";

const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }) });
const server = createServer(yoga);
server.listen(3000);

const testWorker = new Worker(
	"test",
	async (job) => {
		const delayMs = job.data.duration * 1000;

		await new Promise((resolve) => {
			setTimeout(resolve, delayMs);
		});

		if (job.data.shouldFail)
			throw new Error("Failing on purpose because shouldFail=true");

		return {
			anything: "we want to return",
		};
	},
	{
		connection: { host: "localhost", port: 6379 },
	},
);
