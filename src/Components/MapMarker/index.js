import React from "react";
import { Marker } from "react-map-gl";
import { CustomFabBtn } from "../style";
import { formatNumber } from "../../utils";

const formatNumberOptions = {
  notation: "compact",
  compactDisplay: "short",
};

const MapMarker = ({ country, showCountryPopup }) => {
  return (
    <Marker
      offsetLeft={-20}
      offsetTop={-10}
      key={country.country}
      longitude={country.countryInfo.long}
      latitude={country.countryInfo.lat}
    >
      <CustomFabBtn onClick={showCountryPopup}>
        {formatNumber(country.cases, formatNumberOptions)}
      </CustomFabBtn>
    </Marker>
  );
};

export default MapMarker;
