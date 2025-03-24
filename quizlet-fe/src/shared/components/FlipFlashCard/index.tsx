import { useState } from 'react';
import './FlipFlashCard.scss';

export default function FlipFlashCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="flashcard-front flex items-center justify-center p-4 text-white text-2xl font-bold">
          front
        </div>
        {/* Back Side */}
        <div className="flashcard-back flex items-center justify-center p-4 text-white text-2xl font-bold">
          backend
        </div>
      </div>
    </div>
  );
}
