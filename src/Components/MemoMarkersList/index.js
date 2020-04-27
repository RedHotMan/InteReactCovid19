import React from "react";
import { addArrayValues } from "../../utils";
import { FlyToInterpolator } from "react-map-gl";
import MapMarker from "..//MapMarker";
import MapCluster from "../MapCluster";

const MemoMarkersList = React.memo(
  ({ clusters, supercluster, showCountryPopup, viewport, changeViewport }) => {
    return clusters.map((cluster, index) => {
      const {
        cluster: isCluster,
        point_count: pointCount,
        cluster_id: clusterId,
      } = cluster.properties;
      const [longitude, latitude] = cluster.geometry.coordinates;

      if (isCluster) {
        const childrenMarkers = supercluster.getLeaves(clusterId);
        const casesArray = childrenMarkers.map((c) => c.country.cases);
        const totalCases = casesArray.reduce(addArrayValues);

        return (
          <MapCluster
            key={index}
            latitude={latitude}
            longitude={longitude}
            casesCount={totalCases}
            pointCount={pointCount}
            onClusterClick={() => {
              const expansionZoom = Math.min(
                supercluster.getClusterExpansionZoom(clusterId),
                8
              );
              changeViewport({
                ...viewport,
                latitude,
                longitude,
                zoom: expansionZoom,
                transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
                transitionDuration: 1000,
              });
            }}
          />
        );
      }

      return (
        <MapMarker
          key={cluster.country.country}
          country={cluster.country}
          showCountryPopup={(e) => {
            e.preventDefault();
            showCountryPopup(cluster.country);
          }}
        />
      );
    });
  }
);

export default MemoMarkersList;
