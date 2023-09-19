import { GlobalStyles } from "./Styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/layout";
import MainPage from "../src/pages/MainPage";
import StartPage1 from "../src/pages/Common/StartPage/StartPage1";
import StartPage2 from "../src/pages/Common/StartPage/StartPage2";
import StartPage3 from "../src/pages/Common/StartPage/StartPage3";
import StartPage4 from "../src/pages/Common/StartPage/StartPage4";
import StartPage5 from "../src/pages/Common/StartPage/StartPage5";
import MoneyPage from "../src/pages/Common/MoneyPage";
import Main from "./pages/Main";
import Success from "./modal/Quiz/Success";
// 다른 컴포넌트 import...

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/StartPage1" element={<StartPage1 />} />
        <Route path="/StartPage2" element={<StartPage2 />} />
        <Route path="/StartPage3" element={<StartPage3 />} />
        <Route path="/StartPage4" element={<StartPage4 />} />
        <Route path="/StartPage5" element={<StartPage5 />} />
        <Route path="/Success" element={<Success />} />

        {/* Layout 컴포넌트가 중첩 라우트를 포함하도록 수정 */}
        <Route path="/" element={<Layout />}>
          {/* MoneyPage 컴포넌트도 중첩 라우트로 추가 */}
          <Route path="/" element={<Main />} />
          <Route path="MoneyPage" element={<MoneyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
