import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import StartPage1 from "../src/pages/StartPage/StartPage1";
import { GlobalStyles } from "./Styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/StartPage1" element={<StartPage1 />} />
      </Routes>
    </>
  );
}

export default App;
