import React from "react";
import { Marker } from "react-map-gl";
import { CustomFabBtn } from "../style";
import { formatFabNumbers } from "../../utils";

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
        {formatFabNumbers(country.cases)}
      </CustomFabBtn>
    </Marker>
  );
};

export default MapMarker;
