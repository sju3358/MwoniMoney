import styled from "styled-components";

interface ContainerProps {
  width?: string;
  height: string;
  flexDirection?: string;
  justifyContent?: string;
  overflow?: string | undefined; // overflow의 타입을 명시적으로 지정
}

export const Container = styled.div<ContainerProps>`
  border: 1px solid black;
  height: ${(props) => props.height}; /* props.height 값을 스타일에 적용 */
  width: ${(props) => (props.width ? props.width : "100%")};
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: center;
  overflow: ${(props) => props.overflow}; // 기본값을 설정하지 않음
`;
