import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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


export type MutationtestOperationStatusArgs = {
  input?: InputMaybe<TestOperationStatusInput>;
};

export type OperationStatus = {
  __typename?: 'OperationStatus';
  data?: Maybe<Data>;
  errors?: Maybe<Array<Maybe<UserError>>>;
  id: Scalars['String']['output'];
  status: OperationStatusEnum;
};

export type OperationStatusEnum =
  | 'FAIL'
  | 'IN_PROGRESS'
  | 'NOT_FOUND'
  | 'QUEUED'
  | 'SUCCESS'
  | 'UNKNOWN';

export type Query = {
  __typename?: 'Query';
  operationStatus: OperationStatus;
};


export type QueryoperationStatusArgs = {
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Data: ResolverTypeWrapper<Data>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  OperationStatus: ResolverTypeWrapper<Omit<OperationStatus, 'status'> & { status: ResolversTypes['OperationStatusEnum'] }>;
  OperationStatusEnum: ResolverTypeWrapper<'QUEUED' | 'IN_PROGRESS' | 'SUCCESS' | 'FAIL' | 'NOT_FOUND' | 'UNKNOWN'>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  TestOperationStatusInput: TestOperationStatusInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  UserError: ResolverTypeWrapper<UserError>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Data: Data;
  String: Scalars['String']['output'];
  Mutation: Record<PropertyKey, never>;
  OperationStatus: OperationStatus;
  Query: Record<PropertyKey, never>;
  TestOperationStatusInput: TestOperationStatusInput;
  Int: Scalars['Int']['output'];
  Boolean: Scalars['Boolean']['output'];
  UserError: UserError;
};

export type DataResolvers<ContextType = any, ParentType extends ResolversParentTypes['Data'] = ResolversParentTypes['Data']> = {
  anything?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  testOperationStatus?: Resolver<ResolversTypes['OperationStatus'], ParentType, ContextType, Partial<MutationtestOperationStatusArgs>>;
};

export type OperationStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['OperationStatus'] = ResolversParentTypes['OperationStatus']> = {
  data?: Resolver<Maybe<ResolversTypes['Data']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserError']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OperationStatusEnum'], ParentType, ContextType>;
};

export type OperationStatusEnumResolvers = EnumResolverSignature<{ FAIL?: any, IN_PROGRESS?: any, NOT_FOUND?: any, QUEUED?: any, SUCCESS?: any, UNKNOWN?: any }, ResolversTypes['OperationStatusEnum']>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  operationStatus?: Resolver<ResolversTypes['OperationStatus'], ParentType, ContextType, RequireFields<QueryoperationStatusArgs, 'id'>>;
};

export type UserErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Data?: DataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OperationStatus?: OperationStatusResolvers<ContextType>;
  OperationStatusEnum?: OperationStatusEnumResolvers;
  Query?: QueryResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
};

