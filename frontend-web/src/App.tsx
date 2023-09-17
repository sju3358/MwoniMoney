import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import MainPage from "../src/pages/MainPage";
import StartPage1 from "../src/pages/StartPage/StartPage1"
import StartPage2 from "../src/pages/StartPage/StartPage2"
import StartPage3 from "../src/pages/StartPage/StartPage3"
import StartPage4 from "../src/pages/StartPage/StartPage4"
import StartPage5 from "../src/pages/StartPage/StartPage5"

import { GlobalStyles } from "./Styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/StartPage1" element={<StartPage1 />} />
        <Route path="/StartPage2" element={<StartPage2 />} />
        <Route path="/StartPage3" element={<StartPage3 />} />
        <Route path="/StartPage4" element={<StartPage4 />} />
        <Route path="/StartPage5" element={<StartPage5 />} />
      </Routes>
    </>
  );
}

export default App;
