import styled from "styled-components";
import { CustomFabBtn } from "../style";
import { CustomClusterFabNumerBtn } from "../MapCluster/style";

export const LegendToggleFabBtn = styled(CustomFabBtn)`
  &&& {
    background-color: ${(props) =>
      props.showMapLegend ? "#813FC5" : "#D942FB"};
    margin: 1.2rem;
    right: 0;
    width: 2.5rem;
    height: 2.5rem;
    z-index: 100;
  }
`;

export const LegendCustomClusterFabNumerBtn = styled(CustomClusterFabNumerBtn)`
  &&& {
    position: relative;
    transform: none;
  }
`;

export const LegendDiv = styled.div`
  position: absolute;
  right: 0;
  top: 4.5rem;
  width: 20rem;
  background: #334f6e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0.7rem 1.5rem;
  margin: 0 2rem;
  font-size: 0.8rem;
  line-height: 2;
  color: #fff;
  outline: none;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

export const LegendFabBtnDiv = styled.div`
  margin-right: 1rem;
`;
