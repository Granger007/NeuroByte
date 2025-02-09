import React, { useState, useEffect } from "react";
import { GamepadIcon, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

const games = [
  {
    id: 1,
    title: "Card Matching Game",  
    description: "Strengthen short-term memory and recall ability. Supports cognitive flexibility.",
    streak: 1,
    image: "https://www.memozor.com/templates/memoire/images/zoom/memory_game_kids_letters_alphabet.jpg",
    route: "/cardmatching",
  },
  {
    id: 2,
    title: "Maze Game",
    description: "Challenge cognitive flexibility and problem-solving skills. Enhances attention span.",
    streak: 1,
    image: "https://m.media-amazon.com/images/I/11tjDcyK9DL.png",
    route: "/maze",
  },
  {
    id: 3,
    title: "Spot the Difference",
    description: "Identify the differences between two images. Increases attention span.",
    streak: 1,
    image: "https://payload.cargocollective.com/1/0/3562/31236/logo_spotthedifference_o.jpg",
    route: "/spotthedifference",
  },
];

// EXP needed per level
const score = [800,400,500,900,600,700];
const levelThresholds = [250, 500, 900, 1200, 1500];
function getRandomIndex() {
  return Math.floor(Math.random() * 5);
}
const Index = getRandomIndex();

function Games() {
  const [exp, setExp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    // Calculate new level based on EXP
    let newLevel = level;
    while (newLevel < levelThresholds.length && exp >= levelThresholds[newLevel]) {
      newLevel++;
    }
    setLevel(newLevel);
  }, [exp]);

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Level + EXP Bar in Line */}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Level {level}</h2>
        </div>
        {/* EXP Progress Bar */}
        <div className="w-40 bg-gray-300 rounded-full overflow-hidden h-4">
          <div
            className="bg-green-500 h-full transition-all duration-500"
            style={{ width: `${(exp / levelThresholds[level - 1]) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <GamepadIcon className="w-12 h-12 text-primary mr-4" />
        <h1 className="text-3xl font-bold">Cognitive Development Games</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link to={game.route} key={game.id}>
            <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer">
              <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                <p className="text-foreground/60 mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm">Best Score: {score[Index]}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-secondary mr-2" />
                    <span className="text-sm">Streak: {game.streak} days</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Games;