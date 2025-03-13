import './Input.scss';

import classNames from 'classnames';
import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { FaEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { InputProps } from '../../../type/Form/Input';

export default function Input<T extends FieldValues>({
  name,
  control,
  type,
  className,
  label,
}: Readonly<InputProps<T>>) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const inputClassName = classNames(
    'border h-[45px] border-gray-300 rounded-[6px] w-full py-3 px-3.5 text-[1.4rem] outline-none focus:border-blue-500',
    className
  );

  const showInputType = () => {
    if (type === 'password') {
      return isShowPassword ? 'text' : 'password';
    }

    return type;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => {
        return (
          <div className="relative [&:not(:first-child)]:mt-5">
            {label && (
              <label
                className="text-[1.4rem] font-[500] cursor-pointer "
                htmlFor={name}
              >
                {label}
              </label>
            )}

            <div className="relative">
              <input
                id={name}
                className={inputClassName}
                type={showInputType()}
                onChange={onChange}
              />
              {type === 'password' && (
                <div
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-[50%] right-0 translate-x-[-50%] translate-y-[-50%] text-[1.7rem] cursor-pointer p-2"
                >
                  {!isShowPassword ? <FaEyeSlash /> : <FaRegEye />}
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
