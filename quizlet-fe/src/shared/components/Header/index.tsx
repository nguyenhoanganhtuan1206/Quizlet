import './index.scss';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FaRegFolder } from 'react-icons/fa';
import { PiCards } from 'react-icons/pi';
import { IoSearchOutline } from 'react-icons/io5';
import { IoLogoTumblr } from 'react-icons/io';
import { BsList } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import {
  AssemblyAvatar,
  HeaderProfilePopper,
  ModalFolderCreation,
} from '../../../components';

import { Button, Input, PopperWrapper } from '../';

type HeaderFormSearchTerm = {
  term: string;
};

function Header() {
  const { control } = useForm<HeaderFormSearchTerm>();

  const [isHiddenProfile, setIsHiddenProfile] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isDisplayMenu, setIsDisplayMenu] = useState<boolean>(false);
  const [isShowCreateFolder, setIsShowCreateFolder] = useState<boolean>(false);

  const handleShowModalCreation = () => {
    setIsShowCreateFolder(!isShowCreateFolder);
  };

  return (
    <>
      <header className="header">
        <div className="flex items-center flex-1 text-[2.6rem] text-white">
          <BsList className="header__list-icon" />
          <IoLogoTumblr className="ml-4" />
        </div>

        <form
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={`header-search flex-[2] ${isFocus && 'isFocus'}`}
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
        </form>

        <div className="relative flex items-center justify-end flex-1">
          <Button
            className="header__plus border-none"
            onClick={() => setIsDisplayMenu(!isDisplayMenu)}
          >
            <FiPlus className="header__plus-icon" />

            <PopperWrapper
              className="header__plus-popper"
              isActive={isDisplayMenu}
            >
              <div className="header__plus-popper__item">
                <PiCards className="text-[2rem] mr-3" />
                Flashcard Set
              </div>
              <Button
                className="header__plus-popper__item"
                onClick={handleShowModalCreation}
              >
                <FaRegFolder className="text-[2rem] mr-3" />
                Folder
              </Button>
            </PopperWrapper>
          </Button>

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

      <ModalFolderCreation
        isShowModal={isShowCreateFolder}
        onClosed={handleShowModalCreation}
      />
    </>
  );
}

export default Header;
