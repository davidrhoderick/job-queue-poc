import { useMutation } from "@apollo/client/react";
import type { Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { graphql } from "~/gql";
import type { UpdateLocationsInput } from "~/gql/graphql";

const UPDATE_LOCATIONS = graphql(`
  mutation UpdateLocations($input: UpdateLocationsInput!) {
    updateLocations(input: $input) {
      id
      status
    }
  }
`);

export default function UpdateLocationsForm({
  setId,
  transactionId,
}: Readonly<{
  setId: Dispatch<SetStateAction<undefined | string>>;
  transactionId: string;
}>) {
  const [updateLocations] = useMutation(UPDATE_LOCATIONS, {
    onCompleted(data) {
      setId(data.updateLocations.id);
    },
  });

  type FormValues = {
    transactionId: string;
    coverageLocations: Array<{
      state: string;
      streetAddress1?: string;
      streetAddress2?: string;
      city?: string;
      zipCode?: string;
    }>;
  };

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      transactionId,
      coverageLocations: [
        { state: "", streetAddress1: "", streetAddress2: "", city: "", zipCode: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "coverageLocations",
  });

  return (
    <div className="max-w-3xl ml-4 p-4">
      <h2 className="text-xl font-semibold mb-2">Update Locations</h2>
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit((data) =>
          updateLocations({
            variables: {
              input: {
                transactionId: data.transactionId,
                coverageLocations: data.coverageLocations,
              },
            },
          }),
        )}
      >
        <input type="hidden" {...register("transactionId")} />

        {fields.map((field, index) => (
          <div key={field.id} className="rounded border border-gray-200 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor={`state-${index}`}>State</label>
                <input
                  id={`state-${index}`}
                  className="mt-1 rounded border border-gray-300 px-3 py-2"
                  {...register(`coverageLocations.${index}.state` as const)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor={`city-${index}`}>City</label>
                <input
                  id={`city-${index}`}
                  className="mt-1 rounded border border-gray-300 px-3 py-2"
                  {...register(`coverageLocations.${index}.city` as const)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor={`zip-${index}`}>Zip Code</label>
                <input
                  id={`zip-${index}`}
                  className="mt-1 rounded border border-gray-300 px-3 py-2"
                  {...register(`coverageLocations.${index}.zipCode` as const)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor={`addr1-${index}`}>Street Address 1</label>
                <input
                  id={`addr1-${index}`}
                  className="mt-1 rounded border border-gray-300 px-3 py-2"
                  {...register(`coverageLocations.${index}.streetAddress1` as const)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor={`addr2-${index}`}>Street Address 2</label>
                <input
                  id={`addr2-${index}`}
                  className="mt-1 rounded border border-gray-300 px-3 py-2"
                  {...register(`coverageLocations.${index}.streetAddress2` as const)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                onClick={() => remove(index)}
              >
                Remove Location
              </button>
            </div>
          </div>
        ))}

        <div className="flex gap-3">
          <button
            type="button"
            className="rounded bg-gray-200 px-3 py-2 hover:bg-gray-300"
            onClick={() =>
              append({ state: "", streetAddress1: "", streetAddress2: "", city: "", zipCode: "" })
            }
          >
            Add Location
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
