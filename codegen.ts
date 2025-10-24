import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "server/src/generated/schema.generated.graphqls",
	documents: ["app/**/*.tsx"],
	generates: {
		"./app/gql/": {
			preset: "client",
			config: {
				useTypeImports: true,
			},
		},
	},
	hooks: {
		afterAllFileWrite: ["npm run format"],
	},
};

export default config;
