import styled from "styled-components";
import { CustomFabBtn } from "../style";

export const CustomClusterFabBtn = styled(CustomFabBtn)`
  &&& {
    width: 5em;
    height: 5em;
    background-color: #4264fb;
  }
`;

export const CustomClusterFabNumerBtn = styled(CustomFabBtn)`
  &&& {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%);
    min-width: 2.5em;
    min-height: 2.5em;
    width: 0;
    height: 0;
    background-color: #3fc581;
  }
`;
