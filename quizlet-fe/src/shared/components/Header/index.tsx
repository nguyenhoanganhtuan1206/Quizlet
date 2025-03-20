import "./index.scss";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { IoSearchOutline } from "react-icons/io5";
import { IoLogoTumblr } from "react-icons/io";
import { BsList } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

import { AssemblyAvatar, HeaderProfilePopper } from "../../../components";
import { Input } from "../";

type HeaderFormSearchTerm = {
  term: string;
};

function Header() {
  const { control } = useForm<HeaderFormSearchTerm>();
  const [isHiddenProfile, setIsHiddenProfile] = useState<boolean>(false);
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

      <div className="relative flex items-center justify-end flex-1">
        <FiPlus className="header-plus" />

        <AssemblyAvatar
          height="40px"
          width="40px"
          imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
          className="cursor-pointer"
          onClick={() => setIsHiddenProfile(!isHiddenProfile)}
        />

        <HeaderProfilePopper isHidden={isHiddenProfile} />
      </div>
    </header>
  );
}

export default Header;
