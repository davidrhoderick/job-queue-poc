import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import CreateQualificationForm from "~/components/CreateQualificationForm";
import Quote from "~/components/Quote";
import UpdateAnswersForm from "~/components/UpdateAnswersForm";
import UpdateLocationsForm from "~/components/UpdateLocations";
import { graphql } from "~/gql";

const SUBMISSION_STATUS = graphql(`
  query SubmissionStatus($id: String!) {
    submissionStatus(id: $id) {
      id
      status
			type
			data {
				transactionId
				primaryInsured {
					firstName
					lastName
					fein
				}
				questionAnswers {
					questionId
					answer
				}
				coverageLocations {
					state
					streetAddress1
					streetAddress2
					city
					zipCode
				}
					agencyId
			}
			errors {
				message
				path
			}
    }
  }
`);

const setNextStep = (type: string) =>
	type
		? ({
				CREATE_QUALIFICATION: "UPDATE_ANSWERS",
				UPDATE_ANSWERS: "UPDATE_LOCATIONS",
				UPDATE_LOCATIONS: "QUOTE",
			}[type] ?? "UNKNOWN")
		: "UNKNOWN";

export default function Home() {
	const [id, setId] = useState<string | undefined>(undefined);
	const [step, setStep] = useState<string>("CREATE_QUALIFICATION");

	const {
		data: queryData,
		loading,
		error,
		startPolling,
		stopPolling,
	} = useQuery(SUBMISSION_STATUS, {
		skip: !id,
		// @ts-expect-error we know this will be defined if we call it
		variables: { id },
	});

	useEffect(() => {
		if (
			queryData?.submissionStatus?.status === "IN_PROGRESS" ||
			queryData?.submissionStatus?.status === "QUEUED"
		)
			startPolling(1500);
		else {
			stopPolling();
			if (
				queryData?.submissionStatus?.status === "SUCCESS" &&
				queryData.submissionStatus.data?.transactionId?.length
			) {
				setStep(setNextStep(queryData.submissionStatus.type!));
			}
		}
	}, [queryData, startPolling, stopPolling]);

	return (
		<div>
			<div className="p-4">
				<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
					<div className="border-b border-gray-200 px-4 py-3">
						<h2 className="text-sm font-semibold text-gray-600">Operation</h2>
						<p className="text-lg font-semibold text-gray-900">Status</p>
					</div>
					<div className="space-y-3 p-4">
						{error && (
							<div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
								Error: {error.message}
							</div>
						)}
						{queryData && (
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-500">Status</span>
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
											queryData?.submissionStatus?.status === "SUCCESS"
												? "bg-green-100 text-green-700"
												: queryData?.submissionStatus?.status === "FAIL"
													? "bg-red-100 text-red-700"
													: "bg-yellow-100 text-yellow-700"
										}`}
									>
										{queryData?.submissionStatus?.status?.replace("_", " ")}
									</span>
								</div>
								{queryData?.submissionStatus?.data && (
									<div className="text-sm text-gray-700">
										Data:
										<pre>
											{JSON.stringify(queryData.submissionStatus.data, null, 2)}
										</pre>
									</div>
								)}
								{queryData?.submissionStatus?.errors && (
									<div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
										<span className="font-medium">Errors:</span>{" "}
										{queryData.submissionStatus.errors
											.map((error) => error?.message)
											.join(", ")}
									</div>
								)}
							</div>
						)}

						{loading && (
							<div className="text-sm text-gray-500">Checking status…</div>
						)}
					</div>
				</div>
			</div>

			{step === "CREATE_QUALIFICATION" && (
				<CreateQualificationForm setId={setId} />
			)}
			{step === "UPDATE_ANSWERS" && (
				<UpdateAnswersForm
					setId={setId}
					transactionId={queryData?.submissionStatus?.data?.transactionId!}
				/>
			)}
			{step === "UPDATE_LOCATIONS" && (
				<UpdateLocationsForm
					setId={setId}
					transactionId={queryData?.submissionStatus?.data?.transactionId!}
				/>
			)}
			{step === "QUOTE" && (
				<Quote
					setId={setId}
					transactionId={queryData?.submissionStatus?.data?.transactionId!}
				/>
			)}
		</div>
	);
}
