import { useMutation } from "@apollo/client/react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import type { CreateQualificationInput } from "server/src/generated/types.generated";
import { graphql } from "~/gql";

const CREATE_QUALIFICATION = graphql(`
  mutation CreateQualification($input: CreateQualificationInput!) {
    createQualification(input: $input) {
      id
      status
    }
  }
`);

export default function CreateQualificationForm({
	setId,
}: Readonly<{
	setId: Dispatch<SetStateAction<undefined | string>>;
}>) {
	const [createQualification] = useMutation(CREATE_QUALIFICATION, {
		onCompleted(data) {
			setId(data.createQualification.id);
		},
	});

	const { register, handleSubmit } = useForm<CreateQualificationInput>();

	return (
		<div className="max-w-2xl ml-4 p-4">
			<h2 className="text-xl font-semibold mb-2">Create Qualifications</h2>
			<form
				className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				onSubmit={handleSubmit((data) =>
					createQualification({ variables: { input: data } }),
				)}
			>
				<div className="flex flex-col">
					<label htmlFor="firstName" className="text-sm font-medium">First Name</label>
					<input
						type="text"
						id="firstName"
						className="mt-1 rounded border border-gray-300 px-3 py-2"
						{...register("firstName")}
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
					<input
						type="text"
						id="lastName"
						className="mt-1 rounded border border-gray-300 px-3 py-2"
						{...register("lastName")}
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="fein" className="text-sm font-medium">FEIN</label>
					<input
						type="text"
						id="fein"
						className="mt-1 rounded border border-gray-300 px-3 py-2"
						{...register("fein")}
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="agencyId" className="text-sm font-medium">Agency ID</label>
					<select
						id="agencyId"
						className="mt-1 rounded border border-gray-300 px-3 py-2 bg-white"
						{...register("agencyId")}
					>
						<option value="">Select an agency</option>
						<option value="1001">Acme Assurance</option>
						<option value="1002">Beacon Mutual</option>
						<option value="1003">Cypress Casualty</option>
						<option value="1004">Delta Insurance Group</option>
					</select>
				</div>

				<div className="sm:col-span-2">
					<button
						type="submit"
						className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
