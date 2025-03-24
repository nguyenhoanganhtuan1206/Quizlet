import { PiCardsBold } from 'react-icons/pi';

import { AssemblyCard } from '../../../shared/components';

export default function FlashCardStudyMode() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-1">
        <AssemblyCard className="flashcard_study-wrapper">
          <PiCardsBold className="flashcard_study-icon" />

          <p>Flashcards</p>
        </AssemblyCard>
      </div>

      <div className="col-span-1">
        <AssemblyCard className="flashcard_study-wrapper">
          <PiCardsBold className="flashcard_study-icon" />

          <p>Flashcards</p>
        </AssemblyCard>
      </div>

      <div className="col-span-1">
        <AssemblyCard className="flashcard_study-wrapper">
          <PiCardsBold className="flashcard_study-icon" />

          <p>Flashcards</p>
        </AssemblyCard>
      </div>
    </div>
  );
}
