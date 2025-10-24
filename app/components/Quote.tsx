import { useMutation } from "@apollo/client/react";
import type { Dispatch, SetStateAction } from "react";
import { graphql } from "~/gql";

const QUOTE = graphql(`
  mutation Quote($input: QuoteInput!) {
    quote(input: $input) {
      id
      status
    }
  }
`);

export default function Quote({
	setId,
	transactionId,
}: Readonly<{
	setId: Dispatch<SetStateAction<undefined | string>>;
	transactionId: string;
}>) {
	const [quote] = useMutation(QUOTE, {
		variables: { input: { transactionId } },
		onCompleted(data) {
			setId(data.quote.id);
		},
	});

	return (
		<div className="max-w-3xl ml-4 p-4">
			<h2 className="text-xl font-semibold mb-2">Final Review (look up!)</h2>

			<button
				type="button"
				className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				onClick={() => quote()}
			>
				Submit
			</button>
		</div>
	);
}
