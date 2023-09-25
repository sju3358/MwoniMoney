import React from "react";
import styled from "styled-components";

const Input1 = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputTag = styled.input`
  width: 90%;
  height: 50%;
  border: none;
  border-bottom: 1px solid #797979;
`;

interface AllowanceInputProps {
  height: string;
  type: string; // 타입 추가
  placeholder: string; // 플레이스홀더 추가
}

function AllowanceInput({ height, type, placeholder }: AllowanceInputProps) {
  return (
    <Input1 height={height}>
      <InputTag type={type} placeholder={placeholder} /> {/* 추가 */}
    </Input1>
  );
}

export default AllowanceInput;
