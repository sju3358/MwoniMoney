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
  // border: 2px solid green;
  width: 90%;
  height: 50%;
  border: none;
  border-bottom: 1px solid #797979;
  text-align: end;
  padding: 0% 5% 0% 0%;
`;

interface AllowanceInputProps {
  height: string;
  type: string; // 타입 추가
  placeholder: string; // 플레이스홀더 추가
  value: any;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AllowanceInput({
  height,
  type,
  placeholder,
  value,
  name,
  onChange,
}: AllowanceInputProps) {
  return (
    <Input1 height={height}>
      <InputTag
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {/* 추가 */}
    </Input1>
  );
}

export default AllowanceInput;
