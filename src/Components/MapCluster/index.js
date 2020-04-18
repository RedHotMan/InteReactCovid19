import React from "react";
import { Marker } from "react-map-gl";
import { CustomClusterFabBtn, CustomClusterFabNumerBtn } from "./style";
import { formatFabNumbers } from "../../utils";

const MapCluster = ({
  latitude,
  longitude,
  casesCount,
  pointCount,
  onClusterClick,
}) => {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <CustomClusterFabBtn onClick={onClusterClick}>
        {formatFabNumbers(casesCount)}
      </CustomClusterFabBtn>
      <CustomClusterFabNumerBtn>{pointCount}</CustomClusterFabNumerBtn>
    </Marker>
  );
};

export default MapCluster;
