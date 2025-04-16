import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Level404 } from './levels/Level404';
import { Level2 } from './levels/Level2';
import { Level3 } from './levels/Level3';
import { Level4 } from './levels/Level4';
import { FinalLevel } from './levels/FinalLevel';
import { Leaderboard } from './components/Leaderboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<Level404 />} />
        <Route path="/hidden-path" element={<Level2 />} />
        <Route path="/encrypted-gateway" element={<Level3 />} />
        <Route path="/final-challenge" element={<Level4 />} />
        <Route path="/victory" element={<FinalLevel />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;