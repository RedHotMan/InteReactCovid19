import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMapGl from "react-map-gl";
import { MapContainer } from "./style";
import MapPopup from "../../Components/MapPopup";
import MapMarker from "../../Components/MapMarker";

const isLastUpdateTooOld = (lastUpdate) => {
  return (
    new Date().getTime() - process.env.REACT_APP_DATA_EXPIRATION > lastUpdate
  );
};

const MemoMarkersList = React.memo(({ data, showCountryPopup }) => {
  return data.map((country) => {
    if (country.country === "Western Sahara") return null;
    return (
      <MapMarker
        key={country.country}
        country={country}
        showCountryPopup={(e) => {
          e.preventDefault();
          showCountryPopup(country);
        }}
      />
    );
  });
});

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

  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/countries`).then((response) => {
      localStorage.setItem("data", JSON.stringify(response.data));
      localStorage.setItem("lastUpdate", new Date().getTime());
      setData(response.data);
    });
  };

  return (
    <MapContainer>
      <ReactMapGl
        {...viewport}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <MemoMarkersList data={data} showCountryPopup={setSelectedCountry} />
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
