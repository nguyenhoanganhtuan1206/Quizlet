import { PiCards } from 'react-icons/pi';

import { CardItem } from '../../../shared/components';

export default function RecentCardsList() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <CardItem className='w-full'>
        <PiCards />

        <div className="content">
          <p>Name of the flash</p>
          <span>Draft</span>
        </div>
      </CardItem>

      <CardItem className='w-full'>
        <PiCards />

        <div className="content">
          <p>Name of the flash</p>
          <span>Draft</span>
        </div>
      </CardItem>

      <CardItem className='w-full'>
        <PiCards />

        <div className="content">
          <p>Name of the flash</p>
          <span>Draft</span>
        </div>
      </CardItem>

      <CardItem className='w-full'>
        <PiCards />

        <div className="content">
          <p>Name of the flash</p>
          <span>Draft</span>
        </div>
      </CardItem>

      <CardItem className='w-full'>
        <PiCards />

        <div className="content">
          <p>Name of the flash</p>
          <span>Draft</span>
        </div>
      </CardItem>
    </div>
  );
}
