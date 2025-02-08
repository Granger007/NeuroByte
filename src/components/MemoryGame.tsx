import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Brain } from 'lucide-react';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const calculateAccuracy = (updatedScore: number, updatedMoves: number) => {
    if (updatedMoves === 0) {
      return 0;
    }
    return Math.round((updatedScore / updatedMoves) * 100);
  };

  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const generateCards = () => {
    const duplicatedCards = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(duplicatedCards);
    setMoves(0);
    setScore(0);
    setAccuracy(0);
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  const handleChoice = (card: Card) => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      if (!firstChoice) {
        setFirstChoice(card);
      } else if (!secondChoice && card !== firstChoice) {
        setSecondChoice(card);
        setDisabled(true);
      }
      setCards(prevCards =>
        prevCards.map(c => (c.id === card.id ? { ...c, isFlipped: true } : c))
      );
    }
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setMoves(prevMoves => prevMoves + 1);
      if (firstChoice.value === secondChoice.value) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.value === firstChoice.value
              ? { ...card, isMatched: true }
              : card
          )
        );
        setScore(prevScore => {
          const newScore = prevScore + 1;
          setAccuracy(calculateAccuracy(newScore, moves + 1));
          return newScore;
        });
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstChoice.id || card.id === secondChoice.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  useEffect(() => {
    generateCards();
  }, []);

  return (
    <div className={styles.gamesContainer}>
      <h1 className={styles.heading}>Card Matching Game</h1>
      <br />
    <div className={styles.gameList}>
      <div className={styles.memoryGameContainer}>
        <div className={styles.accuracyDisplay}>
          <Brain size={24} className={styles.brainEmoji} />
          <span>Accuracy: {accuracy}%</span>
        </div>

        <button onClick={generateCards}>New Game</button>
        <p className='mt-4'>Moves: {moves}</p>
        <p className='mb-8'>Score: {score}</p>
        <div className={styles.cardGrid}>
          {cards.map(card => (
            <div
              key={card.id}
              className={`${styles.card} ${card.isFlipped ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''}`}
              onClick={() => handleChoice(card)}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}></div>
                <div className={styles.cardBack}>{card.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MemoryGame;