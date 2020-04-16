import React from "react";
import { Marker } from "react-map-gl";
import { CustomClusterFabBtn } from "./style";

const MapCluster = ({ latitude, longitude, pointCount, onClusterClick }) => {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <CustomClusterFabBtn onClick={onClusterClick}>
        {pointCount}
      </CustomClusterFabBtn>
    </Marker>
  );
};

export default MapCluster;
