import React from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import {
  allowanceMoney,
  isAllowanceMoney,
} from "../../../states/AllowanceState";
import { specialMoney, isSpecialMoney } from "../../../states/AllowanceState";

/*category 상자 */

const CategoryContainer = styled.div`
  // border: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Category = styled.div`
  background-color: white;
  border: 1px solid #bbbbbb;
  border-radius: 12px;
  width: 28%;
  height: 80%;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-size: 1em; /* 글자 크기 조절 */
  font-weight: bold;
  &:active {
    background-color: #bbbbbb;
    transform: translate(0em, 0.2em);
  }
`;
interface categoryProps {
  al: string;
}

function AllowanceCategory({ al }: categoryProps) {
  const [allowanceMoneyData, setAllowanceMoneyData] =
    useRecoilState(allowanceMoney);
  const [IsAllowanceMoney, setIsAllowanceMoney] =
    useRecoilState(isAllowanceMoney);

  const [SpecialMoneyData, setSpecialMoneyData] = useRecoilState(specialMoney);
  const [IsSpecialMoney, setIsSpecialMoney] = useRecoilState(isSpecialMoney);

  const handleChangeMoneyR = (data: number) => {
    console.log("alR이 뭐야?", al);
    setIsAllowanceMoney(true);
    setAllowanceMoneyData(data);
    console.log(allowanceMoneyData);
  };

  const handleChangeMoneyS = (data: number) => {
    console.log("alS이 뭐야?", al);
    setIsSpecialMoney(true);
    setSpecialMoneyData(data);
    console.log(SpecialMoneyData);
  };

  return (
    <CategoryContainer>
      {al === "regular" ? (
        <>
          <Category onClick={() => handleChangeMoneyR(100000)}>1만원</Category>
          <Category onClick={() => handleChangeMoneyR(500000)}>5만원</Category>
          <Category onClick={() => handleChangeMoneyR(1000000)}>
            10만원
          </Category>
        </>
      ) : (
        <>
          <Category onClick={() => handleChangeMoneyS(100000)}>1만원</Category>
          <Category onClick={() => handleChangeMoneyS(500000)}>5만원</Category>
          <Category onClick={() => handleChangeMoneyS(1000000)}>
            10만원
          </Category>
        </>
      )}
    </CategoryContainer>
  );
}

export default AllowanceCategory;
