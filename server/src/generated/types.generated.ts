import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
	[P in K]-?: NonNullable<T[P]>;
};
export type EnumResolverSignature<T, AllowedValues = any> = {
	[key in keyof T]?: AllowedValues;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type CoverageLocation = {
	__typename?: "CoverageLocation";
	city?: Maybe<Scalars["String"]["output"]>;
	state: Scalars["String"]["output"];
	streetAddress1?: Maybe<Scalars["String"]["output"]>;
	streetAddress2?: Maybe<Scalars["String"]["output"]>;
	zipCode?: Maybe<Scalars["String"]["output"]>;
};

export type CoverageLocationInput = {
	city?: InputMaybe<Scalars["String"]["input"]>;
	state: Scalars["String"]["input"];
	streetAddress1?: InputMaybe<Scalars["String"]["input"]>;
	streetAddress2?: InputMaybe<Scalars["String"]["input"]>;
	zipCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateQualificationInput = {
	agencyId: Scalars["String"]["input"];
	fein: Scalars["String"]["input"];
	firstName: Scalars["String"]["input"];
	lastName: Scalars["String"]["input"];
	transactionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type Mutation = {
	__typename?: "Mutation";
	createQualification: SubmissionStatus;
	quote: SubmissionStatus;
	updateAnswers: SubmissionStatus;
	updateLocations: SubmissionStatus;
};

export type MutationcreateQualificationArgs = {
	input: CreateQualificationInput;
};

export type MutationquoteArgs = {
	input: QuoteInput;
};

export type MutationupdateAnswersArgs = {
	input: UpdateAnswersInput;
};

export type MutationupdateLocationsArgs = {
	input: UpdateLocationsInput;
};

export type PolicyPeriod = {
	__typename?: "PolicyPeriod";
	agencyId: Scalars["String"]["output"];
	coverageLocations?: Maybe<Array<Maybe<CoverageLocation>>>;
	premium?: Maybe<Scalars["Float"]["output"]>;
	primaryInsured: PrimaryInsured;
	questionAnswers?: Maybe<Array<Maybe<QuestionAnswer>>>;
	transactionId: Scalars["String"]["output"];
};

export type PrimaryInsured = {
	__typename?: "PrimaryInsured";
	fein: Scalars["String"]["output"];
	firstName: Scalars["String"]["output"];
	lastName: Scalars["String"]["output"];
};

export type Query = {
	__typename?: "Query";
	submissionStatus: SubmissionStatus;
};

export type QuerysubmissionStatusArgs = {
	id: Scalars["String"]["input"];
};

export type QuestionAnswer = {
	__typename?: "QuestionAnswer";
	answer: Scalars["String"]["output"];
	questionId: Scalars["String"]["output"];
};

export type QuestionAnswerInput = {
	answer: Scalars["String"]["input"];
	questionId: Scalars["String"]["input"];
};

export type QuoteInput = {
	transactionId: Scalars["String"]["input"];
};

export type SubmissionStatus = {
	__typename?: "SubmissionStatus";
	data?: Maybe<PolicyPeriod>;
	errors?: Maybe<Array<Maybe<UserError>>>;
	id: Scalars["String"]["output"];
	status: SubmissionStatusEnum;
	type: SubmissionType;
};

export type SubmissionStatusEnum =
	| "FAIL"
	| "IN_PROGRESS"
	| "NOT_FOUND"
	| "QUEUED"
	| "SUCCESS"
	| "UNKNOWN";

export type SubmissionType =
	| "CREATE_QUALIFICATION"
	| "QUOTE"
	| "UNKNOWN"
	| "UPDATE_ANSWERS"
	| "UPDATE_LOCATIONS";

export type UpdateAnswersInput = {
	questionAnswers?: InputMaybe<Array<InputMaybe<QuestionAnswerInput>>>;
	transactionId: Scalars["String"]["input"];
};

export type UpdateLocationsInput = {
	coverageLocations?: InputMaybe<Array<InputMaybe<CoverageLocationInput>>>;
	transactionId: Scalars["String"]["input"];
};

export type UserError = {
	__typename?: "UserError";
	message: Scalars["String"]["output"];
	path?: Maybe<Scalars["String"]["output"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
	TResult,
	TParent = Record<PropertyKey, never>,
	TContext = Record<PropertyKey, never>,
	TArgs = Record<PropertyKey, never>,
> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = Record<PropertyKey, never>,
	TContext = Record<PropertyKey, never>,
	TArgs = Record<PropertyKey, never>,
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<
	TTypes,
	TParent = Record<PropertyKey, never>,
	TContext = Record<PropertyKey, never>,
> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<
	T = Record<PropertyKey, never>,
	TContext = Record<PropertyKey, never>,
> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = Record<PropertyKey, never>,
	TParent = Record<PropertyKey, never>,
	TContext = Record<PropertyKey, never>,
	TArgs = Record<PropertyKey, never>,
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	CoverageLocation: ResolverTypeWrapper<CoverageLocation>;
	String: ResolverTypeWrapper<Scalars["String"]["output"]>;
	CoverageLocationInput: CoverageLocationInput;
	CreateQualificationInput: CreateQualificationInput;
	Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
	PolicyPeriod: ResolverTypeWrapper<PolicyPeriod>;
	Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
	PrimaryInsured: ResolverTypeWrapper<PrimaryInsured>;
	Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
	QuestionAnswer: ResolverTypeWrapper<QuestionAnswer>;
	QuestionAnswerInput: QuestionAnswerInput;
	QuoteInput: QuoteInput;
	SubmissionStatus: ResolverTypeWrapper<
		Omit<SubmissionStatus, "status" | "type"> & {
			status: ResolversTypes["SubmissionStatusEnum"];
			type: ResolversTypes["SubmissionType"];
		}
	>;
	SubmissionStatusEnum: ResolverTypeWrapper<
		"QUEUED" | "IN_PROGRESS" | "SUCCESS" | "FAIL" | "NOT_FOUND" | "UNKNOWN"
	>;
	SubmissionType: ResolverTypeWrapper<
		| "CREATE_QUALIFICATION"
		| "UPDATE_ANSWERS"
		| "UPDATE_LOCATIONS"
		| "QUOTE"
		| "UNKNOWN"
	>;
	UpdateAnswersInput: UpdateAnswersInput;
	UpdateLocationsInput: UpdateLocationsInput;
	UserError: ResolverTypeWrapper<UserError>;
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	CoverageLocation: CoverageLocation;
	String: Scalars["String"]["output"];
	CoverageLocationInput: CoverageLocationInput;
	CreateQualificationInput: CreateQualificationInput;
	Mutation: Record<PropertyKey, never>;
	PolicyPeriod: PolicyPeriod;
	Float: Scalars["Float"]["output"];
	PrimaryInsured: PrimaryInsured;
	Query: Record<PropertyKey, never>;
	QuestionAnswer: QuestionAnswer;
	QuestionAnswerInput: QuestionAnswerInput;
	QuoteInput: QuoteInput;
	SubmissionStatus: SubmissionStatus;
	UpdateAnswersInput: UpdateAnswersInput;
	UpdateLocationsInput: UpdateLocationsInput;
	UserError: UserError;
	Boolean: Scalars["Boolean"]["output"];
};

export type CoverageLocationResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["CoverageLocation"] = ResolversParentTypes["CoverageLocation"],
> = {
	city?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	state?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	streetAddress1?: Resolver<
		Maybe<ResolversTypes["String"]>,
		ParentType,
		ContextType
	>;
	streetAddress2?: Resolver<
		Maybe<ResolversTypes["String"]>,
		ParentType,
		ContextType
	>;
	zipCode?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
	createQualification?: Resolver<
		ResolversTypes["SubmissionStatus"],
		ParentType,
		ContextType,
		RequireFields<MutationcreateQualificationArgs, "input">
	>;
	quote?: Resolver<
		ResolversTypes["SubmissionStatus"],
		ParentType,
		ContextType,
		RequireFields<MutationquoteArgs, "input">
	>;
	updateAnswers?: Resolver<
		ResolversTypes["SubmissionStatus"],
		ParentType,
		ContextType,
		RequireFields<MutationupdateAnswersArgs, "input">
	>;
	updateLocations?: Resolver<
		ResolversTypes["SubmissionStatus"],
		ParentType,
		ContextType,
		RequireFields<MutationupdateLocationsArgs, "input">
	>;
};

export type PolicyPeriodResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["PolicyPeriod"] = ResolversParentTypes["PolicyPeriod"],
> = {
	agencyId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	coverageLocations?: Resolver<
		Maybe<Array<Maybe<ResolversTypes["CoverageLocation"]>>>,
		ParentType,
		ContextType
	>;
	premium?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
	primaryInsured?: Resolver<
		ResolversTypes["PrimaryInsured"],
		ParentType,
		ContextType
	>;
	questionAnswers?: Resolver<
		Maybe<Array<Maybe<ResolversTypes["QuestionAnswer"]>>>,
		ParentType,
		ContextType
	>;
	transactionId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type PrimaryInsuredResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["PrimaryInsured"] = ResolversParentTypes["PrimaryInsured"],
> = {
	fein?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
	submissionStatus?: Resolver<
		ResolversTypes["SubmissionStatus"],
		ParentType,
		ContextType,
		RequireFields<QuerysubmissionStatusArgs, "id">
	>;
};

export type QuestionAnswerResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["QuestionAnswer"] = ResolversParentTypes["QuestionAnswer"],
> = {
	answer?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	questionId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type SubmissionStatusResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["SubmissionStatus"] = ResolversParentTypes["SubmissionStatus"],
> = {
	data?: Resolver<
		Maybe<ResolversTypes["PolicyPeriod"]>,
		ParentType,
		ContextType
	>;
	errors?: Resolver<
		Maybe<Array<Maybe<ResolversTypes["UserError"]>>>,
		ParentType,
		ContextType
	>;
	id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	status?: Resolver<
		ResolversTypes["SubmissionStatusEnum"],
		ParentType,
		ContextType
	>;
	type?: Resolver<ResolversTypes["SubmissionType"], ParentType, ContextType>;
};

export type SubmissionStatusEnumResolvers = EnumResolverSignature<
	{
		FAIL?: any;
		IN_PROGRESS?: any;
		NOT_FOUND?: any;
		QUEUED?: any;
		SUCCESS?: any;
		UNKNOWN?: any;
	},
	ResolversTypes["SubmissionStatusEnum"]
>;

export type SubmissionTypeResolvers = EnumResolverSignature<
	{
		CREATE_QUALIFICATION?: any;
		QUOTE?: any;
		UNKNOWN?: any;
		UPDATE_ANSWERS?: any;
		UPDATE_LOCATIONS?: any;
	},
	ResolversTypes["SubmissionType"]
>;

export type UserErrorResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["UserError"] = ResolversParentTypes["UserError"],
> = {
	message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	path?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	CoverageLocation?: CoverageLocationResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	PolicyPeriod?: PolicyPeriodResolvers<ContextType>;
	PrimaryInsured?: PrimaryInsuredResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	QuestionAnswer?: QuestionAnswerResolvers<ContextType>;
	SubmissionStatus?: SubmissionStatusResolvers<ContextType>;
	SubmissionStatusEnum?: SubmissionStatusEnumResolvers;
	SubmissionType?: SubmissionTypeResolvers;
	UserError?: UserErrorResolvers<ContextType>;
};
