import { GlobalStyles } from "./Styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/layout";
import Main from "./pages/Main";
import MainPage from "./pages/Login/MainPage";
import StartPage1 from "../src/pages/Common/StartPage/StartPage1";
import StartPage2 from "../src/pages/Common/StartPage/StartPage2";
import StartPage3 from "../src/pages/Common/StartPage/StartPage3";
import StartPage4 from "../src/pages/Common/StartPage/StartPage4";
import StartPage5 from "../src/pages/Common/StartPage/StartPage5";
import MoneyPage from "../src/pages/Common/MoneyPage";
import Challenge from "../src/pages/Challenge";
import Success from "./modal/Quiz/Success";
import Bank from "./components/Parents/Bank";
import MyPage from "./pages/MyPage";
import Balance from "./pages/Balance";
import GoalMoney from "./pages/GoalMoney";
import ChildCreate from "./modal/ChildCreate";
import ChallengeCreate from "./modal/Challenge/ChallengeCreate";
import News from "./modal/Quiz/News";
import LoanProposal from "./modal/LoanProposal";
import Faq from "./pages/Faq";
import GoalCreate from "./components/Children/GoalCreate";
import ProgressModal from "./modal/ProgressModal";

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
        <Route path="ChildCreate" element={<ChildCreate />} />
        <Route path="ChallengeCreate" element={<ChallengeCreate />} />
        <Route path="News" element={<News />} />
        <Route path="LoanProposal" element={<LoanProposal />} />
        <Route path="GoalCreate" element={<GoalCreate />} />
        <Route path="ProgressModal" element={<ProgressModal />} />

        {/* Layout 컴포넌트가 중첩 라우트를 포함하도록 수정 */}
        <Route path="/" element={<Layout />}>
          {/* MoneyPage 컴포넌트도 중첩 라우트로 추가 */}
          <Route path="/" element={<Main />} />
          <Route path="MoneyPage" element={<MoneyPage />} />
          <Route path="Challenge" element={<Challenge />} />
          <Route path="Bank" element={<Bank />} />
          <Route path="MyPage" element={<MyPage />} />
          <Route path="Balance" element={<Balance />} />
          <Route path="GoalMoney" element={<GoalMoney />} />
          <Route path="Faq" element={<Faq />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
