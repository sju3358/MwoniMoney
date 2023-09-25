import styled from "styled-components";

interface ContainerProps {
  width?: string;
  height: string;
  flexDirection?: string;
  justifyContent?: string;
  overflowx?: string | undefined;
  overflowy?: string | undefined;
  radius?: string | undefined;
  backcolor?: string | undefined;
  color?: string | undefined;
  fontw?: string | undefined;
  fonts?: string | undefined;
  marginT?: string | undefined;
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
  overflow-x: ${(props) => (props.overflowx ? props.overflowx : "hidden")};
  overflow-y: ${(props) => props.overflowy};
  border-radius: ${(props) => props.radius};
  background-color: ${(props) => props.backcolor};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontw};
  font-size: ${(props) => props.fonts};
  margin-top: ${(props) => props.marginT};
`;
