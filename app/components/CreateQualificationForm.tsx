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
		<div>
			<form
				onSubmit={handleSubmit((data) =>
					createQualification({ variables: { input: data } }),
				)}
			>
				<label htmlFor="agencyId">Agency ID</label>
				<input type="text" id="agencyId" {...register("agencyId")} />

				<label htmlFor="fein">FEIN</label>
				<input type="text" id="fein" {...register("fein")} />

				<label htmlFor="firstName">First Name</label>
				<input type="text" id="firstName" {...register("firstName")} />

				<label htmlFor="lastName">Last Name</label>
				<input type="text" id="lastName" {...register("lastName")} />

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
