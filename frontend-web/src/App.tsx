import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import StartPage1 from './pages/StartPage/StartPage1';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/StartPage1" element={<StartPage1 />} />
    </Routes>
  );
}

export default App;
