import { useForm } from "react-hook-form";
import { Select } from "../../shared/components";
import { SelectOptionProps } from "../../type/form/Input";

export default function DevPage() {
  const selectForm = useForm();
  const initialOptionSelection: SelectOptionProps[] = [
    {
      title: "Lambor",
      value: "lambor",
    },
    {
      title: "Lambor 2",
      value: "lambor 2",
    },
  ];

  console.log("selectedForm", selectForm.watch("selectedForm"));
  ;

  return (
    <form>
      <Select
        control={selectForm.control}
        name="selectedForm"
        options={initialOptionSelection}
        variant="border-only"
        className="duration-200"
      />
    </form>
  );
}
