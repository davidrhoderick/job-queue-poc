/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { helloWorld as Query_helloWorld } from './helloWorld/resolvers/Query/helloWorld';
import    { quote as Mutation_quote } from './quote/resolvers/Mutation/quote';
    export const resolvers: Resolvers = {
      Query: { helloWorld: Query_helloWorld },
      Mutation: { quote: Mutation_quote },
      
      
    }