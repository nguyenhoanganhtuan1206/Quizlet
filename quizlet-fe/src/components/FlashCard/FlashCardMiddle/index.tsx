import FlashCardTerm from '../FlashCardTerm';

export default function FlashcardMiddle() {
  return (
    <div>
      <ul>
        <li className='mt-5'>
          <FlashCardTerm />
        </li>
        <li className="mt-5">
          <FlashCardTerm />
        </li>
        <li className="mt-5">
          <FlashCardTerm />
        </li>
      </ul>
    </div>
  );
}
