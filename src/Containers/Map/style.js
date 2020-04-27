import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const MapContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const CustomFabBtn = styled.span`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: white;
  width: 3em;
  height: 3em;
  font-size: 0.6em;
  font-weight: bold;
  background-color: #f50057;
  border-radius: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.9);
  cursor: pointer;
`;

export const SearchDiv = styled.div`
  position: absolute;
  right: 0;
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SearchForm = styled(Paper)`
  &&& {
    padding: 0 0.2rem;
    display: flex;
    width: 17rem;
    align-items: center;
    background-color: rgba(87, 102, 119, 0.8);
  }
`;
