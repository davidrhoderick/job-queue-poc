import { createServer } from 'node:http';
import { createYoga, createSchema } from 'graphql-yoga';

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world 🌍'
  }
};

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers })
});

const server = createServer(yoga);
server.listen(4000, () => {
  console.log('🚀 Server ready at http://localhost:4000/graphql');
});
