import { useMutation } from "@apollo/client/react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { graphql } from "~/gql";
import type { UpdateAnswersInput } from "~/gql/graphql";

const UPDATE_ANSWERS = graphql(`
  mutation UpdateAnswers($input: UpdateAnswersInput!) {
    updateAnswers(input: $input) {
      id
      status
    }
  }
`);

export default function UpdateAnswersForm({
  setId,
  transactionId,
}: Readonly<{
  setId: Dispatch<SetStateAction<undefined | string>>;
  transactionId?: string;
}>) {
  const [updateAnswers] = useMutation(UPDATE_ANSWERS, {
    onCompleted(data) {
      setId(data.updateAnswers.id);
    },
  });

  type FormValues = {
    transactionId: string;
    q1: "YES" | "NO";
    q2: "YES" | "NO";
  };

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { transactionId: transactionId ?? "" },
  });

  return (
    <div className="max-w-2xl ml-4 p-4">
      <h2 className="text-xl font-semibold mb-2">Update Answers</h2>
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit((data) =>
          updateAnswers({
            variables: {
              input: {
                transactionId: data.transactionId,
                questionAnswers: [
                  { questionId: "PRIOR_CLAIMS", answer: data.q1 },
                  { questionId: "HAZARDOUS_OPS", answer: data.q2 },
                ],
              },
            },
          }),
        )}
      >
        <input type="hidden" id="transactionId" {...register("transactionId")} />

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Any prior claims in the last 3 years?</legend>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="YES" {...register("q1")} />
              <span>Yes</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="NO" {...register("q1")} />
              <span>No</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Any hazardous operations?</legend>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="YES" {...register("q2")} />
              <span>Yes</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" value="NO" {...register("q2")} />
              <span>No</span>
            </label>
          </div>
        </fieldset>

        <div>
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
