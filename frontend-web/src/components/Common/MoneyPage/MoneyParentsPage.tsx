import React, { useEffect, useState } from "react";
import { Container } from "../About/AboutContainer";
import { TextBox } from "../About/AboutText";
import { EmogiBox } from "../About/AboutEmogi";
import Chart from "../../../assests/image/MoneyPage/Chart.png";
import { Category } from "../About/AboutCategory";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import AboutCard from "../About/AboutCard";
import MoneyTable from "./MoneyTable";
import Outcome from "../../../assests/image/MoneyPage/MoneyBag.png";
import Income from "../../../assests/image/MoneyPage/OutCome.png";
import { useRecoilState } from "recoil";
import axios from "axios";
import { userDataState } from "../../../states/UserInfoState";

// Define the interface for a transaction
interface Transaction {
  money: number;
  balance: number;
  memo: string;
  time: string | null;
}

function MoneyChildPage() {
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [userData, setUserData] = useRecoilState(userDataState);
  console.log("왜안들어옴?");
  const child = userData.name;
  const [transactionData, setTransactionData] = useState<{
    finAccountTransactionDto2: Transaction[];
    totalPlus: number;
    totalMinus: number;
  } | null>(null);
  const [category, setCategory] = useState("GENERAL");

  useEffect(() => {
    // Define the request body
    const requestBody = {
      type: "GENERAL",
      finAccountType: "GENERAL",
    };

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Define the headers with Authorization
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the axios request
    axios
      .post(
        "https://j9b310.p.ssafy.io/api/v2/accounts/transactions/parents",
        requestBody,
        { headers }
      )
      .then((response) => {
        // Handle the response data here
        console.log("Transaction data:", response.data);
        setTransactionData(response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching transaction data:", error);
      });
  }, []);

  // Function to filter data based on the category
  const filterDataByCategory = (category: string) => {
    if (transactionData) {
      if (category === "GENERAL") {
        // Show all transactions
        return transactionData.finAccountTransactionDto2;
      } else if (category === "INCOME") {
        // Show transactions with positive money values
        return transactionData.finAccountTransactionDto2.filter(
          (transaction) => transaction.money > 0
        );
      } else if (category === "OUTCOME") {
        // Show transactions with negative money values
        return transactionData.finAccountTransactionDto2.filter(
          (transaction) => transaction.money < 0
        );
      }
    }
    return [];
  };

  // Function to handle category clicks
  const handleCategoryClick = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  return (
    <>
      {/* 맨 상단 타이틀 */}
      <Container height="25%">
        <Container width="75%" height="100%" flexDirection="column">
          <TextBox fontSize="1.4em" height="25%" marginL="10%">
            {child}님이
          </TextBox>
          <TextBox fontSize="1.4em" height="25%" marginL="10%">
            현재까지 사용한 금액을
          </TextBox>
          <TextBox fontSize="1.4em" height="25%" marginL="10%">
            확인해보세요!
          </TextBox>
        </Container>
        <Container width="25%" height="100%">
          <EmogiBox backImg={`${Chart}`} width="50%" height="50%" />
        </Container>
      </Container>
      {/* 수입지출 카드 */}
      <Container height="20%" justifyContent="space-around">
        <AboutCard
          width="40%"
          title1="수입"
          title2="지출"
          content1={`+ ${transactionData?.totalPlus || 0}원`} // Display totalPlus with a default value of 0
          content2={`${transactionData?.totalMinus || 0}원`} // Display totalMinus with a default value of 0
          backcolor1="#b9deb3"
          backcolor2="#ffa27e"
          fontsize1="1.3em"
          fontsize2="1.1em"
          fontweight="bold"
        />
      </Container>
      {/* 지출내역 리스트 */}
      <Container height="53%" style={{ minHeight: "400px" }}>
        <WhiteBox1
          flexDirection="column"
          height="95%"
          style={{ overflowY: "auto" }}
        >
          {/* 제목 */}
          <Container height="13%">
            <TextBox height="100%">지출내역</TextBox>
          </Container>
          {/* 카테고리 */}
          <Container height="13%" justifyContent="start">
            <Category
              backcolor={category === "GENERAL" ? "#f4f4f4" : "#ffffff"}
              onClick={() => handleCategoryClick("GENERAL")}
            >
              전체
            </Category>
            <Category
              backcolor={category === "INCOME" ? "#b9deb3" : "#ffffff"}
              onClick={() => handleCategoryClick("INCOME")}
            >
              수익
            </Category>
            <Category
              backcolor={category === "OUTCOME" ? "#ffa27e" : "#ffffff"}
              onClick={() => handleCategoryClick("OUTCOME")}
            >
              지출
            </Category>
          </Container>
          <Container
            style={{ border: "1px solid red" }}
            height="500px"
            flexDirection="column"
          >
            {filterDataByCategory(category).map(
              (transaction: Transaction, index: number) => (
                <MoneyTable
                  key={index}
                  emogi={transaction.money > 0 ? `${Income}` : `${Outcome}`}
                  expense_detail={transaction.memo}
                  expense_date={
                    transaction.time ? formatDate(transaction.time) : "N/A"
                  }
                  spending={Math.abs(transaction.money)}
                />
              )
            )}
          </Container>
        </WhiteBox1>
      </Container>
    </>
  );
}

export default MoneyChildPage;
