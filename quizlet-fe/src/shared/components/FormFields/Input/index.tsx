import "./Input.scss";

import classNames from "classnames";
import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";

import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { InputProps } from "../../../../type/form/Input";

/**
 * Params
 * name: The name represented for the field in react hook form
 * control: Defined to control value, fieldState,... in react hok form
 * type: type of the input
 * className: The className for input element
 * outsideClassName: Represented for className in div wrapped for Input element
 */
export default function Input<T extends FieldValues>({
  name,
  control,
  type,
  onFocus,
  variant,
  className,
  label,
  placeholder,
  outsideClassName,
  cols = 3,
  rows = 5,
}: Readonly<InputProps<T>>) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const inputClassName = classNames(
    "input border h-[45px] border-gray-300 rounded-[6px] w-full py-3 px-3.5 text-[1.4rem] outline-none focus:border-blue-500",
    {
      "input--mode-black": variant === "mode-black",
    },
    className
  );

  const showInputType = () => {
    if (type === "password") {
      return isShowPassword ? "text" : "password";
    }

    return type;
  };

  const renderInput = (
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ) => {
    return type === "textarea" ? (
      <textarea
        id={name}
        className={inputClassName}
        cols={cols}
        rows={rows}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    ) : (
      <input
        id={name}
        className={inputClassName}
        type={showInputType()}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => {
        return (
          <div className={`${outsideClassName} relative`}>
            {label && (
              <label
                className="text-[1.4rem] text-gray-700 font-[500] cursor-pointer"
                htmlFor={name}
              >
                {label}
              </label>
            )}

            {/**
             * Just display when have the hidden password
             */}
            {type === "password" ? (
              <div className="relative">
                {renderInput(onChange)}
                <button
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-[50%] right-0 translate-x-[-50%] translate-y-[-50%] text-[1.7rem] cursor-pointer p-2"
                >
                  {!isShowPassword ? <FaEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            ) : (
              renderInput(onChange)
            )}
            {/**
             * Just display when have the hidden password
             */}

            {/*!
             * Using to display the error message
             * */}
            {/*!
             * Using to display the error message
             * */}
          </div>
        );
      }}
    />
  );
}
