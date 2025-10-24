import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react";
import CreateQualificationForm from "~/components/CreateQualificationForm";
import { graphql } from "~/gql";

const SUBMISSION_STATUS = graphql(`
  query SubmissionStatus($id: String!) {
    submissionStatus(id: $id) {
      id
      status
			data {
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

export default function Home() {
	const [duration, setDuration] = useState(10);
	const [shouldFail, setShouldFail] = useState(false);
	const [id, setId] = useState<string | undefined>(undefined);

	// const [mutate, { data: mutationData }] = useMutation(TEST_OPERATION_STATUS);

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
		else stopPolling();
	}, [queryData?.submissionStatus?.status, startPolling, stopPolling]);

	return (
		<div>
			<div className="flex items-end gap-4 p-4">
				<div className="flex flex-col gap-1">
					<label
						htmlFor="duration"
						className="text-sm font-medium text-gray-700"
					>
						Duration (s)
					</label>
					<input
						id="duration"
						type="number"
						min={0}
						value={duration}
						onChange={(e) => setDuration(Number(e.target.value))}
						className="w-28 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<label
					htmlFor="should-fail"
					className="inline-flex items-center gap-2 text-sm text-gray-700 mb-2"
				>
					<input
						id="should-fail"
						type="checkbox"
						checked={shouldFail}
						onChange={(e) => setShouldFail(e.target.checked)}
						className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
					Should fail
				</label>
				{/* <button
					type="button"
					onClick={() => mutate({ variables: { duration, shouldFail } })}
					className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Submit
				</button> */}
			</div>

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
										{status?.replace("_", " ")}
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

			<CreateQualificationForm setId={setId} />
		</div>
	);
}
