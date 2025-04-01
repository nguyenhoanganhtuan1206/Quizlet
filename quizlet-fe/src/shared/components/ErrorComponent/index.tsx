import { TbFaceIdError } from 'react-icons/tb';
import Button from '../FormFields/Button';

export default function ErrorComponent() {
  return (
    <div className="m-auto border border-gray-500 w-fit rounded-xl my-20 px-10 py-5 flex flex-col items-center justify-center">
      <TbFaceIdError className="text-white text-[10rem]" />

      <h3 className="text-[2.6rem] font-bold text-white">
        Opps, something went wrong!!!
      </h3>
      <span className="text-[1.6rem] mt-5 text-[var(--color-white-gray)]">
        Please try again.
      </span>

      <Button className="mt-5 border-none" path="/" variant="borderOnly">
        Go to the Home Page
      </Button>
    </div>
  );
}
