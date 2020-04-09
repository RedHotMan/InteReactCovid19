import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({}))`
  min-height: 100vh;
  display: ${(props) => props.display || "flex"};
  flex-direction: column;
`;
