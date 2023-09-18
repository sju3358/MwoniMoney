import { GlobalStyles } from "./Styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/layout";
import Main from "./Main";
import ChallengeMainParent from "./pages/Parents/Challenge/ChallengeMain";
import MainPage from "../src/pages/MainPage";
import StartPage1 from "../src/pages/StartPage/StartPage1";
import StartPage2 from "../src/pages/StartPage/StartPage2";
import StartPage3 from "../src/pages/StartPage/StartPage3";
import StartPage4 from "../src/pages/StartPage/StartPage4";
import StartPage5 from "../src/pages/StartPage/StartPage5";
import MoneyPage from "../src/pages/Common/MoneyPage";
import ParentsMain from "../src/pages/Parents/Main";

// 다른 컴포넌트 import...

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

        <Route element={<Layout />}>
          <Route path="/MoneyPage" element={<MoneyPage />} />
          <Route
            path="/ChallengeMainParent"
            element={<ChallengeMainParent />}
          />
          <Route path="/ParentsMain" element={<ParentsMain />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
