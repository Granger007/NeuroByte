import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GRID_SIZE = 10;
const WALL = "⬛";
const PLAYER = "🟦";
const GOAL = "🏁";
const DEATH = "💀";
const EMPTY = "⬜";
const START_SCORE = 500;
const SCORE_DECREMENT = 10;
const MAX_ATTEMPTS = 3;

const generateMaze = (): string[][] => {
  let maze = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(WALL));

  let path = [[0, 0]];
  let x = 0, y = 0;
  while (x < GRID_SIZE - 1 || y < GRID_SIZE - 1) {
    if (x === GRID_SIZE - 1) y++;
    else if (y === GRID_SIZE - 1) x++;
    else Math.random() < 0.3 ? x++ : y++;
    path.push([x, y]);
  }

  path.forEach(([px, py]) => (maze[px][py] = EMPTY));

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (maze[i][j] === WALL && Math.random() < 0.4) {
        maze[i][j] = EMPTY;
      }
    }
  }

  for (let i = 1; i < GRID_SIZE - 1; i++) {
    for (let j = 1; j < GRID_SIZE - 1; j++) {
      if (maze[i][j] === EMPTY && Math.random() < 0.01) {
        maze[i][j] = DEATH;
      }
    }
  }

  maze[0][0] = PLAYER;
  maze[GRID_SIZE - 1][GRID_SIZE - 1] = GOAL;

  return maze;
};

const MazeGame: React.FC = () => {
  const navigate = useNavigate();
  const [maze, setMaze] = useState<string[][]>(generateMaze);
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState<number>(START_SCORE);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [ exp, setExp ]= useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || attempts >= MAX_ATTEMPTS) return;
      let { x, y } = playerPos;
      let newX = x,
        newY = y;

      if (e.key === "ArrowUp" && x > 0) newX--;
      if (e.key === "ArrowDown" && x < GRID_SIZE - 1) newX++;
      if (e.key === "ArrowLeft" && y > 0) newY--;
      if (e.key === "ArrowRight" && y < GRID_SIZE - 1) newY++;

      if (maze[newX][newY] !== WALL) {
        let newMaze = maze.map(row => [...row]);
        newMaze[x][y] = EMPTY;
        newMaze[newX][newY] = PLAYER;
        setMaze(newMaze);
        setPlayerPos({ x: newX, y: newY });
        setScore(prevScore => prevScore - SCORE_DECREMENT);

        if (maze[newX][newY] === DEATH) {
          setMessage("💀 You lost!");
          setGameOver(true);
        } else if (maze[newX][newY] === GOAL) {
          setMessage("🎉 You won!");
          setGameOver(true);
          setExp(exp + Math.round(score * 0.5)); // Update EXP
        } else if (score - SCORE_DECREMENT <= 0) {
          setMessage("❌ Game Over! Score reached 0");
          setGameOver(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos, maze, gameOver, score, attempts, exp, setExp]);

  const restartGame = () => {
    if (attempts + 1 >= MAX_ATTEMPTS) {
      navigate("/games");
      return;
    }
    setMaze(generateMaze());
    setPlayerPos({ x: 0, y: 0 });
    setScore(START_SCORE);
    setMessage("");
    setGameOver(false);
    setAttempts(attempts + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Maze Game</h1>
      <p className="text-lg font-semibold">Score: {score}</p>
      <p className="text-lg font-semibold">EXP: {exp}</p>
      <p className="text-lg font-semibold">Attempts Left: {MAX_ATTEMPTS - attempts}</p>
      {message && <div className="mb-4 text-lg font-semibold">{message}</div>}
      <div className="grid gap-1 my-4" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)` }}>
        {maze.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="h-10 w-10 flex items-center justify-center text-2xl border"
              style={{ background: cell === WALL ? "#222" : cell === DEATH ? "red" : "white" }}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      {gameOver && (
        <button onClick={restartGame} className="px-4 py-2 bg-blue-500 text-white rounded">
          {attempts + 1 >= MAX_ATTEMPTS ? "Exit to Games" : "Restart Game"}
        </button>
      )}
    </div>
  );
};

export default MazeGame;
