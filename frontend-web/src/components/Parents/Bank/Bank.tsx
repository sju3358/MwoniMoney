import styled from "styled-components";

interface ContainerProps {
  height: string;
  flexDirection?: string | null;
}

export const Container = styled.div<ContainerProps>`
  border: 1px solid black;
  height: ${(props) => props.height}; /* props.height 값을 스타일에 적용 */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: center;
  align-items: center;
`;
