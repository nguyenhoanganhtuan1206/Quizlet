import { IoCloseCircleOutline } from "react-icons/io5";

import "../../FormFields.scss";
import "./SelectSearchItem.scss";

import classNames from "classnames";
import { InputVariant, SelectOptionProps } from "@/type/form/Input";

interface SelectSearchItemProps {
  variant: InputVariant;
  selectedOptions: SelectOptionProps[];
  isShowListOptions: boolean;
  setIsShowListOptions: (isShow: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleRemoveItem: (option: string | number) => void;
}

export default function SelectSearchItem({
  variant,
  selectedOptions,
  isShowListOptions,
  setIsShowListOptions,
  searchTerm,
  setSearchTerm,
  handleRemoveItem,
}: Readonly<SelectSearchItemProps>) {
  /*
    Define classNames
  */
  const selectSearchItemWrapperClassNames = classNames(
    "flex flex-wrap min-h-[40px] bg-[var(--color-primary-sub)] rounded-[5px] duration-500 overflow-hidden",
    {
      "form--mode-black": variant === "mode-black",
      "form--mode-border-only": variant === "border-only",
    }
  );

  const inputSearchItemClassNames = classNames(
    "flex flex-1 h-full text-[1.4rem] placeholder-[font-weight:600] px-5 py-6 bg-transparent outline-none cursor-pointer"
  );

  const listSelectedValuesClassNames = classNames(
    "inline-flex items-center bg-transparent px-2 py-1 rounded mr-1 mb-1"
  );

  /* Display values selected */
  const renderSelectedValues = () => {
    return (
      <div className="flex flex-wrap translate-[-50%, -50%]">
        {selectedOptions.map((optionSelected, index) => (
          <p
            key={index}
            className="flex items-center p-3 mr-3 mt-3 border border-gray-500 rounded-md text-xl cursor-pointer"
          >
            <span>{optionSelected.title}</span>

            <IoCloseCircleOutline
              onClick={() => handleRemoveItem(optionSelected.value)}
              className="ml-3 text-[1.6rem] h-[20px] w-[20px] hover:opacity-60"
            />
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className={selectSearchItemWrapperClassNames}>
      {selectedOptions && selectedOptions.length > 0 && (
        <div className={listSelectedValuesClassNames}>
          {renderSelectedValues()}
        </div>
      )}

      <input
        className={inputSearchItemClassNames}
        value={searchTerm}
        onClick={(e) => {
          e.stopPropagation();
          setIsShowListOptions(!isShowListOptions);
        }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!isShowListOptions) {
            setIsShowListOptions(true);
          }
        }}
        placeholder={selectedOptions.length === 0 ? "Select your options" : ""}
      />
    </div>
  );
}
