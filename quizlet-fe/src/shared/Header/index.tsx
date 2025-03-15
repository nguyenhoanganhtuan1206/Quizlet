import "./index.scss";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { IoSearchOutline } from "react-icons/io5";
import { IoLogoTumblr } from "react-icons/io";
import { BsList } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

import Input from "../FormFields/Input";

type HeaderFormSearchTerm = {
  term: string;
};

function Header() {
  const { control } = useForm<HeaderFormSearchTerm>();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <header className="header">
      <div className="flex items-center flex-1 text-[2.6rem] text-white">
        <BsList className="header__list-icon" />
        <IoLogoTumblr className="ml-4" />
      </div>

      <div
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={`header-search flex-[2] ${isFocus && "isFocus"}`}
      >
        <IoSearchOutline className="header-search__icon" />

        <Input
          outsideClassName="header-search__input-wrapper"
          className="header-search__input"
          control={control}
          type="text"
          name="term"
          placeholder="Search for flashcards"
        />
      </div>

      <div className="flex-1">
        <FaPlus />
      </div>
    </header>
  );
}

export default Header;
