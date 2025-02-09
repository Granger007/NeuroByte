import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
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

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar user={user} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/assessment" element={<Assessment />} />
            {user ? (
              <>
                {user.role === 'doctor' && (
                  <Route path="/diagnosis" element={<Diagnosis />} />
                )}
                {user.role === 'parent' && (
                  <>
                    <Route path="/autismquestionnaire" element={<AutismQuestionnaire />} />
                    <Route path="/adhdquestionnaire" element={<ADHDQuestionnaire />} />
                    <Route path='/symptom' element={<Symptom />} />
                  </>
                )}
                <Route path="/games" element={<Games />} />
                <Route path="/earlydiagnosis" element={<EarlyDiagnosis />} />
                <Route path="/mindfulness" element={<Mindfulness />} />
                <Route path="/cardmatching" element={<MemoryGame />} />
                <Route path="/maze" element={<Maze />} />
                <Route path="/spotthedifference" element={<SpotTheDifference />} />
                <Route path="/logout" element={<Navigate to="/auth" />} />
              </>
            ) : (
              <Route path="/*" element={<Auth />} />
            )}
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
