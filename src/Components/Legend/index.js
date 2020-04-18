import React, { useState } from "react";
import {
  LegendToggleFabBtn,
  LegendCustomClusterFabNumerBtn,
  LegendDiv,
  LegendItem,
  LegendFabBtnDiv,
} from "./style";
import { CustomFabBtn } from "../style";
import { CustomClusterFabBtn } from "../MapCluster/style";

const Legend = () => {
  const [showMapLegend, setShowMapLegend] = useState(false);

  return (
    <>
      <LegendToggleFabBtn
        onClick={(e) => {
          e.preventDefault();
          setShowMapLegend(!showMapLegend);
        }}
        showMapLegend={showMapLegend}
      >
        {showMapLegend ? (
          <i className="ri-close-line"></i>
        ) : (
          <i className="ri-menu-5-line"></i>
        )}
      </LegendToggleFabBtn>
      {showMapLegend ? (
        <LegendDiv>
          <LegendItem>
            <LegendFabBtnDiv>
              <CustomFabBtn>1K</CustomFabBtn>
            </LegendFabBtnDiv>
            <p>
              Country marker displaying the number of confirmed cases. Click on
              it to display more information.
            </p>
          </LegendItem>
          <LegendItem>
            <LegendFabBtnDiv>
              <CustomClusterFabBtn>10K</CustomClusterFabBtn>
            </LegendFabBtnDiv>
            <p>
              Cluster of country markers displaying the number of confirmed
              cases inside it. Click on it to destructure into smaller ones or
              into coutry markers.
              <i className="ri-cursor-line"></i>
            </p>
          </LegendItem>
          <LegendItem>
            <LegendFabBtnDiv>
              <LegendCustomClusterFabNumerBtn>3</LegendCustomClusterFabNumerBtn>
            </LegendFabBtnDiv>
            <p>Number of country markers inside a cluster.</p>
          </LegendItem>
        </LegendDiv>
      ) : null}
    </>
  );
};

export default Legend;
