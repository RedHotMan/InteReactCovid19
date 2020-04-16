import React, { useState, useEffect, useRef } from "react";
import ReactMapGl from "react-map-gl";
import useSupercluster from "use-supercluster";
import { MapContainer } from "./style";
import { getCountriesData } from "../../utils";
import MapPopup from "../../Components/MapPopup";
import MapMarker from "../../Components/MapMarker";
import MapCluster from "../../Components/MapCluster";

const isLastUpdateTooOld = (lastUpdate) => {
  return (
    new Date().getTime() - process.env.REACT_APP_DATA_EXPIRATION > lastUpdate
  );
};

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
        return (
          <MapCluster
            key={index}
            latitude={latitude}
            longitude={longitude}
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

const MemoPopup = React.memo(({ country, closeCountryPopup }) => {
  return (
    <MapPopup
      country={country}
      closeCountryPopup={() => {
        closeCountryPopup(null);
      }}
    />
  );
});

const Mapbox = () => {
  const mapRef = useRef();

  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "auto",
    latitude: 0,
    longitude: 0,
    zoom: 2,
    minZoom: 1,
    maxZoom: 8,
  });

  useEffect(() => {
    const lastUpdate = localStorage.getItem("lastUpdate");

    if (data.length > 0) {
      if (lastUpdate && isLastUpdateTooOld(lastUpdate)) {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    const escapeKey = (e) => {
      if (e.key === "Escape") {
        setSelectedCountry(null);
      }
    };
    window.addEventListener("keydown", escapeKey);
    return () => {
      window.removeEventListener("keydown", escapeKey);
    };
  }, []);

  const fetchData = async () => {
    const fetchedData = await getCountriesData();
    setData(fetchedData ? fetchedData : []);
  };

  const points = data.map((country) => ({
    type: "Feature",
    properties: {
      cluster: false,
    },
    geometry: {
      type: "country",
      coordinates: [country.countryInfo.long, country.countryInfo.lat],
    },
    country: { ...country },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds: mapRef.current
      ? mapRef.current.getMap().getBounds().toArray().flat()
      : null,
    options: { radius: 60, maxZoom: 4 },
  });

  return (
    <MapContainer>
      <ReactMapGl
        {...viewport}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        ref={mapRef}
      >
        <MemoMarkersList
          clusters={clusters}
          supercluster={supercluster}
          showCountryPopup={setSelectedCountry}
          viewport={viewport}
          changeViewport={setViewport}
        />
        {selectedCountry ? (
          <MemoPopup
            country={selectedCountry}
            closeCountryPopup={setSelectedCountry}
          />
        ) : null}
      </ReactMapGl>
    </MapContainer>
  );
};

export default Mapbox;
