import React, { useState, useEffect, useRef } from "react";
import ReactMapGl, { FlyToInterpolator } from "react-map-gl";
import { Paper, InputBase, IconButton } from "@material-ui/core";
import useSupercluster from "use-supercluster";
import { MapContainer } from "./style";
import { getCountriesData, addArrayValues } from "../../utils";
import MapPopup from "../../Components/MapPopup";
import MapMarker from "../../Components/MapMarker";
import MapCluster from "../../Components/MapCluster";
import Legend from "../../Components/Legend";

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
  const [searchedCountry, setSearchedCountry] = useState("");

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

  const searchForCountry = () => {
    if (!searchedCountry) {
      return;
    }

    const res = data.filter((country) => {
      return country.country === searchedCountry;
    });

    if (res.length) {
      setViewport({
        ...viewport,
        zoom: 5,
        latitude: res[0].countryInfo.lat,
        longitude: res[0].countryInfo.long,
        transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
        transitionDuration: 1000,
      });

      setSelectedCountry(res[0]);
    }
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
      <div
        style={{
          position: "absolute",
          right: 0,
          width: "30rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Paper
          style={{
            padding: "0 0.2rem",
            display: "flex",
            width: "17rem",
            alignItems: "center",
            backgroundColor: "rgba(87, 102, 119, 0.8)",
          }}
          component="form"
        >
          <IconButton onClick={() => searchForCountry()}>
            <i style={{ color: "#fff" }} className="ri-search-line"></i>
          </IconButton>
          <InputBase
            style={{ marginLeft: "2rem", color: "#fff" }}
            placeholder="Search for a country…"
            value={searchedCountry}
            onChange={(e) => setSearchedCountry(e.target.value)}
          />
        </Paper>
        <Legend />
      </div>
    </MapContainer>
  );
};

export default Mapbox;
