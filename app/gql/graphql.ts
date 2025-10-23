/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Data = {
  __typename?: 'Data';
  anything: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  testOperationStatus: OperationStatus;
};


export type MutationTestOperationStatusArgs = {
  input: TestOperationStatusInput;
};

export type OperationStatus = {
  __typename?: 'OperationStatus';
  data?: Maybe<Data>;
  errors?: Maybe<Array<Maybe<UserError>>>;
  id: Scalars['String']['output'];
  status: OperationStatusEnum;
};

export enum OperationStatusEnum {
  Fail = 'FAIL',
  InProgress = 'IN_PROGRESS',
  NotFound = 'NOT_FOUND',
  Queued = 'QUEUED',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN'
}

export type Query = {
  __typename?: 'Query';
  operationStatus: OperationStatus;
};


export type QueryOperationStatusArgs = {
  id: Scalars['String']['input'];
};

export type TestOperationStatusInput = {
  duration: Scalars['Int']['input'];
  shouldFail?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String']['output'];
  path?: Maybe<Scalars['String']['output']>;
};

export type TestOperationStatusMutationVariables = Exact<{
  duration: Scalars['Int']['input'];
  shouldFail?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type TestOperationStatusMutation = { __typename?: 'Mutation', testOperationStatus: { __typename?: 'OperationStatus', id: string, status: OperationStatusEnum } };

export type OperationStatusQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type OperationStatusQuery = { __typename?: 'Query', operationStatus: { __typename?: 'OperationStatus', id: string, status: OperationStatusEnum, data?: { __typename?: 'Data', anything: string } | null, errors?: Array<{ __typename?: 'UserError', message: string, path?: string | null } | null> | null } };


export const TestOperationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestOperationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"duration"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shouldFail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testOperationStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"duration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"duration"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"shouldFail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shouldFail"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<TestOperationStatusMutation, TestOperationStatusMutationVariables>;
export const OperationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OperationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"operationStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anything"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<OperationStatusQuery, OperationStatusQueryVariables>;