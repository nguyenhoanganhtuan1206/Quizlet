import { BsList } from 'react-icons/bs';
import { IoLogoTumblr } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';

function Header() {
  return (
    <header className="header bg-[var(--color-primary-sub)] w-full h-[4rem] px-[0.75rem] py-[1rem] box-border fixed">
      <div className="text-white">
        <BsList />
        <IoLogoTumblr />
      </div>

      <div className="header-search"></div>

      <div>
        <FaPlus />
      </div>
    </header>
  );
}

export default Header;
