import { useForm } from "react-hook-form";
import { SelectOptionProps } from "../../type/form/Input";
import MultipleSelect from "../../shared/components/FormFields/mutiple_select";
import Button from "@mui/material/Button";

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
  const selectForm = useForm({
    defaultValues: {
      multipleSelect: [],
    },
  });

  return (
    <form>
      <MultipleSelect
        isMultiple
        control={selectForm.control}
        name="multipleSelect"
        options={initialOptionSelection}
        variant="mode-black"
        className="text-[2rem] duration-200"
      />

      <Button variant="outlined">Hello world</Button>
    </form>
  );
}
