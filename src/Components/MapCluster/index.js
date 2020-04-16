import React from "react";
import { Marker } from "react-map-gl";
import { CustomClusterFabBtn } from "./style";

const MapCluster = ({ latitude, longitude, pointCount }) => {
  return (
    <Marker longitude={latitude} latitude={longitude}>
      <CustomClusterFabBtn>{pointCount}</CustomClusterFabBtn>
    </Marker>
  );
};

export default MapCluster;
