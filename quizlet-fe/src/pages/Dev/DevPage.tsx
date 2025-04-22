import { useForm } from "react-hook-form";
import { SelectOptionProps } from "../../type/form/Input";

import MultipleSelect from "../../shared/components/FormFields/mutiple_select";

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
    <form onSubmit={selectForm.handleSubmit(handleOnSubmit)}>
      <MultipleSelect
        isMultiple
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
