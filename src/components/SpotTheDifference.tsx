import React, { useState, useEffect, useRef } from 'react';
import styles from './SpotTheDifference.module.css';

interface DifferenceArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const SpotTheDifference: React.FC = () => {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [tracing, setTracing] = useState(false);
  const [traceDots, setTraceDots] = useState<{ x: number; y: number; color: string }[]>([]);
  const [gameRestartKey, setGameRestartKey] = useState(0); // Unique key to force re-render

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Correct Image pairs and differences
  const imageSets = [
    {
      image1: "/image6.png",
      image2: "/image5.png",
      differences: [
        { x: 75, y: 90, width: 50, height: 50 }, // Balloon
        { x: 160, y: 130, width: 40, height: 40 } // String
      ]
    },
    {
      image1: "/image2.png",
      image2: "/image1.png",
      differences: [
        { x: 100, y: 200, width: 50, height: 50 }, // Claw
        { x: 220, y: 140, width: 40, height: 40 } // Extra leaf
      ]
    },
    {
      image1: "/image4.png",
      image2: "/image3.png",
      differences: [
        { x: 240, y: 50, width: 60, height: 40 }, // Cloud shape
        { x: 150, y: 220, width: 40, height: 40 } // Egg on the ground
      ]
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImageSet = imageSets[currentImageIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentImageSet) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    traceDots.forEach(({ x, y, color }) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [traceDots, currentImageSet]);

  const handleMouseDown = () => {
    setTracing(true);
    setTraceDots([]);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!tracing || !canvasRef.current || !currentImageSet) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const isCorrect = currentImageSet.differences.some(area =>
      x >= area.x && x <= area.x + area.width &&
      y >= area.y && y <= area.y + area.height
    );

    setTraceDots(prev => [...prev, { x, y, color: isCorrect ? 'green' : 'red' }]);
  };

  const handleMouseUp = () => {
    setTracing(false);

    if (!currentImageSet) return;

    const correctTrace = traceDots.some(dot =>
      currentImageSet.differences.some(area =>
        dot.x >= area.x && dot.x <= area.x + area.width &&
        dot.y >= area.y && dot.y <= area.y + area.height
      )
    );

    if (correctTrace) {
      setScore(prev => prev + 1);
      setMessage('✅ Correct!');
    } else {
      setMessage('❌ Incorrect.');
    }

    setTimeout(() => {
      setTraceDots([]);
      if (currentImageIndex < imageSets.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else {
        setMessage('🎉 Game Over! All Differences Found.');
      }
    }, 1000);
  };

  const handleRestartGame = () => {
    setScore(0);
    setCurrentImageIndex(0);
    setMessage('');
    setTraceDots([]);
    setGameRestartKey(prev => prev + 1); // Force component refresh
  };

  return (
    <div className={styles.container} key={gameRestartKey}>
      <h2 className='text-center text-2xl my-8'>Spot the Difference</h2>
      <p className='text-center text-xl my-8'>Score: {score}</p>
      <p>{message}</p>

      {currentImageSet ? (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img src={currentImageSet.image1} alt="First image" className={styles.image} />
          </div>
          <div className={styles.imageWrapper}>
            <img src={currentImageSet.image2} alt="Second image" className={styles.image} />
            <canvas
              ref={canvasRef}
              className={styles.canvas}
              width={300}
              height={300}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            />
          </div>
        </div>
      ) : (
        <p>All images completed! 🎉</p>
      )}

      <button onClick={handleRestartGame} className={styles.restartButton}>
        Restart Game
      </button>
    </div>
  );
};

export default SpotTheDifference;