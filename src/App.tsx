import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Assessment from './components/Assessment';
import Diagnosis from './components/Diagnosis';
import Games from './components/Games';
import Auth from './components/Auth';
import { useAuthStore } from './store/auth';
import SpotTheDifference from './components/SpotTheDifference';
import Maze from './components/Maze';
import MemoryGame from './components/MemoryGame';
import EarlyDiagnosis from './components/EarlyDiagnosis';
import Mindfulness from './components/Mindfulness';
import AutismQuestionnaire from './components/AutismQuestionnaire';
import ADHDQuestionnaire from './components/ADHDQuestionnaire';
import Symptom from './components/Symptom';



function App() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Assessment />} />
            {user.role === 'doctor' && (
              <Route path="/diagnosis" element={<Diagnosis />} />
            )}
            {
              user.role === 'parent' && (
                <>
                  <Route path="/autismquestionnaire" element={<AutismQuestionnaire />} />
                  <Route path="/adhdquestionnaire" element={<ADHDQuestionnaire />} />
                  <Route path='/symptom' element={<Symptom />} />
                </>
              )
            }

            <Route path="/games" element={<Games />} />
            <Route path="/earlydiagnosis" element={<EarlyDiagnosis />} />
            <Route path="/mindfulness" element={<Mindfulness />} />
            <Route path="/cardmatching" element={<MemoryGame />} />
            <Route path="/Maze" element={<Maze />} />
            <Route path="/spotthedifference" element={<SpotTheDifference />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;