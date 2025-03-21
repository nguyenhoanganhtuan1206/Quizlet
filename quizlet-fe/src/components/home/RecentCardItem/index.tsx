import './index.scss';

import { PiCards } from 'react-icons/pi';

import { CardItem } from '../../../shared/components';

type RecentCardItemProps = {
  isActive?: boolean;
  className?: string;
};

export default function RecentCardItem({
  isActive,
}: Readonly<RecentCardItemProps>) {
  return (
    <CardItem className="recent_card-item rounded-[6px]">
      <PiCards className={`recent_card-item-icon ${isActive && 'active'}`} />

      <div className="ml-5 text-[1.3rem]">
        <p className="font-bold">Name of the flash</p>
        <span>Draft</span>
      </div>
    </CardItem>
  );
}
