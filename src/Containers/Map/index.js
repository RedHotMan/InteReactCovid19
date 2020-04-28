import React, { useState, useEffect, useRef } from "react";
import ReactMapGl, { FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
import { MapContainer, LegendDiv } from "./style";
import { getCountriesData, isLastUpdateTooOld } from "../../utils";
import MemoMarkersList from "../../Components/MemoMarkersList";
import MemoPopup from "../../Components/MemoPopup";
import Legend from "../../Components/Legend";
import Search from "../../Components/Search";

const Mapbox = () => {
  const mapRef = useRef();

  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [searchError, setSearchError] = useState(false);

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
      setSearchError(true);
      return;
    }

    const res = data.filter((country) => {
      return country.country.toLowerCase() === searchedCountry.toLowerCase();
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
    } else {
      setSearchError(true);
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

      <LegendDiv>
        <Search
          setSearchedCountry={setSearchedCountry}
          searchForCountry={searchForCountry}
          searchedCountry={searchedCountry}
          searchError={searchError}
          setSearchError={setSearchError}
        />
        <Legend />
      </LegendDiv>
    </MapContainer>
  );
};

export default Mapbox;
