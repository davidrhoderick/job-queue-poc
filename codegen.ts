import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "server/src/generated/schema.generated.graphqls",
	documents: ["app/**/*.tsx"],
	ignoreNoDocuments: true,
	generates: {
		"./app/gql/": {
			preset: "client",
			config: {
				useTypeImports: true,
			},
		},
	},
};

export default config;
