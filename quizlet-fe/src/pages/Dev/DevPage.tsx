import { useForm } from "react-hook-form";
import { SelectOptionProps } from "../../type/form/Input";

import MultipleSelect from "../../shared/components/FormFields/multiple_select";
import FormLabel from "@/shared/components/FormFields/form_label";

interface FormData {
  multipleSelect: (string | number)[];
}

export default function DevPage() {
  const initialOptionSelection: SelectOptionProps[] = [
    {
      title: "Lambor",
      value: "lambor",
    },
    {
      title: "Lambor 2",
      value: "lambor 2",
    },
    {
      title: "Lambor 3",
      value: "lambor 3",
    },
    {
      title: "Lambor 4",
      value: "lambor 4",
    },
    {
      title: "Lambor 4",
      value: "lambor 5",
    },
    {
      title: "Lambor 4",
      value: "lambor 6",
    },
  ];
  const selectForm = useForm<FormData>({
    defaultValues: {
      multipleSelect: [],
    },
  });

  const handleOnSubmit = (data: FormData) => {
    console.log("Submitted values:", data);
  };

  return (
    <form onSubmit={selectForm.handleSubmit(handleOnSubmit)} className="p-5">
      <FormLabel name="multipleSelect">Label</FormLabel>

      <MultipleSelect
        control={selectForm.control}
        name="multipleSelect"
        options={initialOptionSelection}
        variant="mode-black"
      />

      <button type="submit" className="mt-10">
        Submit
      </button>
    </form>
  );
}
