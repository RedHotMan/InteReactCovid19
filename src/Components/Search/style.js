import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const SearchForm = styled(Paper)`
  &&& {
    padding: 0 0.2rem;
    display: flex;
    width: 17rem;
    align-items: center;
    background-color: ${(props) =>
      props.error ? "rgba(245, 0, 87, 0.6)" : "rgba(87, 102, 119, 0.8)"};
  }
`;
