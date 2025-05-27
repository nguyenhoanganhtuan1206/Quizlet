import FlashCardItem from "../flash_card_item";

export default function FlashCardList() {
  return (
    <div>
      <h3 className="text-white text-[2.2rem] font-bold">
        Terms in this set (5)
      </h3>

      <ul>
        <li className="mt-5">
          <FlashCardItem />
        </li>
        <li className="mt-5">
          <FlashCardItem />
        </li>
        <li className="mt-5">
          <FlashCardItem />
        </li>
      </ul>
    </div>
  );
}
