import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Main from "./pages/Main";
import StartPage1 from "../src/pages/Common/StartPage/StartPage1";
import StartPage2 from "../src/pages/Common/StartPage/StartPage2";
import StartPage3 from "../src/pages/Common/StartPage/StartPage3";
import StartPage4 from "../src/pages/Common/StartPage/StartPage4";
import StartPage5 from "../src/pages/Common/StartPage/StartPage5";
import MoneyPage from "../src/pages/Common/MoneyPage";
import Challenge from "../src/pages/Challenge";
import Success from "./modal/Quiz/Success";
import Bank from "./pages/Bank";
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
import LoginRedirect from "./pages/Login/LoginRedirect";
import Fail from "./modal/Quiz/Fail";
import Qr from "./pages/Qr";
import { RecoilRoot } from "recoil";
import { GlobalStyles } from "./Styles/GlobalStyle";
import Layout from "./components/Layout/layout";

function App() {
  // 로컬 스토리지에서 userUuidState 값을 가져옵니다.
  const userUuidState = localStorage.getItem("userState");

  return (
    <>
      <GlobalStyles />
      <RecoilRoot>
        <Routes>
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route
            path="/StartPage1"
            element={
              userUuidState ? <StartPage1 /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="/StartPage2"
            element={
              userUuidState ? <StartPage2 /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="/StartPage3"
            element={
              userUuidState ? <StartPage3 /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="/StartPage4"
            element={
              userUuidState ? <StartPage4 /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="/StartPage5"
            element={
              userUuidState ? <StartPage5 /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="/Success"
            element={userUuidState ? <Success /> : <Navigate to="/LoginPage" />}
          />
          <Route
            path="/Fail"
            element={userUuidState ? <Fail /> : <Navigate to="/LoginPage" />}
          />
          <Route
            path="ChildCreate"
            element={
              userUuidState ? <ChildCreate /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="ChallengeCreate"
            element={
              userUuidState ? <ChallengeCreate /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="News"
            element={userUuidState ? <News /> : <Navigate to="/LoginPage" />}
          />
          <Route
            path="LoanProposal"
            element={
              userUuidState ? <LoanProposal /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="GoalCreate"
            element={
              userUuidState ? <GoalCreate /> : <Navigate to="/LoginPage" />
            }
          />
          <Route
            path="ProgressModal"
            element={
              userUuidState ? <ProgressModal /> : <Navigate to="/LoginPage" />
            }
          />
          <Route path="/oauth/redirect" element={<LoginRedirect />} />

          {/* Layout 컴포넌트가 중첩 라우트를 포함하도록 수정 */}
          <Route path="/" element={<Layout />}>
            {/* MoneyPage 컴포넌트도 중첩 라우트로 추가 */}
            <Route
              path="/"
              element={userUuidState ? <Main /> : <Navigate to="/LoginPage" />}
            />
            <Route
              path="MoneyPage"
              element={
                userUuidState ? <MoneyPage /> : <Navigate to="/LoginPage" />
              }
            />
            <Route
              path="Challenge"
              element={
                userUuidState ? <Challenge /> : <Navigate to="/LoginPage" />
              }
            />
            <Route
              path="Bank"
              element={userUuidState ? <Bank /> : <Navigate to="/LoginPage" />}
            />
            <Route
              path="MyPage"
              element={
                userUuidState ? <MyPage /> : <Navigate to="/LoginPage" />
              }
            />
            <Route
              path="Balance"
              element={
                userUuidState ? <Balance /> : <Navigate to="/LoginPage" />
              }
            />
            <Route
              path="GoalMoney"
              element={
                userUuidState ? <GoalMoney /> : <Navigate to="/LoginPage" />
              }
            />
            <Route
              path="Faq"
              element={userUuidState ? <Faq /> : <Navigate to="/LoginPage" />}
            />
            <Route
              path="qr"
              element={userUuidState ? <Qr /> : <Navigate to="/LoginPage" />}
            />
          </Route>
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;
