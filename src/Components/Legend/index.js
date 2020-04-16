import React, { useState } from "react";
import {
  LegendToggleFabBtn,
  LegendDiv,
  LegendItem,
  LegendFabBtnDiv,
} from "./style";
import { CustomFabBtn } from "../style";
import { CustomClusterFabBtn } from "../MapCluster/style";

const Legend = () => {
  const [showMapLegend, setShowMapLegend] = useState(true);
  return (
    <>
      <LegendToggleFabBtn
        onClick={() => {
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
              <CustomClusterFabBtn>5</CustomClusterFabBtn>
            </LegendFabBtnDiv>
            <p>
              Cluster of country markers displaying the number of markers inside
              it. Try click on it
              <i className="ri-cursor-line"></i>
            </p>
          </LegendItem>
        </LegendDiv>
      ) : null}
    </>
  );
};

export default Legend;
