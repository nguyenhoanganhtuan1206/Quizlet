import './index.scss';

import { PiCards } from 'react-icons/pi';

import { CardItem } from '../../../shared/components';

type RecentCardItemProps = {
  name: string;
  isActive: boolean;
  className?: string;
};

export default function RecentCardItem({
  name,
  isActive,
  className,
}: Readonly<RecentCardItemProps>) {
  return (
    <CardItem className={`${className} recent_card-item rounded-[6px] transition-all duration-[100ms]`}>
      <PiCards className={`recent_card-item-icon ${isActive && 'active'}`} />

      <div className="ml-5 text-[1.3rem]">
        <p className="font-bold">{name}</p>
        <span>{!isActive ? 'Draft' : 'Flashcard set'}</span>
      </div>
    </CardItem>
  );
}
