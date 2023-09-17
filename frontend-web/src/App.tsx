import { GlobalStyles } from "./Styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./Main";
import StartPage1 from "../src/pages/StartPage/StartPage1";
import ChallengeMainParent from "./pages/Parents/Challenge/ChallengeMain";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/StartPage1" element={<StartPage1 />} />
        <Route path="/ChallengeMainParent" element={<ChallengeMainParent />} />
      </Routes>
    </>
  );
}

export default App;
