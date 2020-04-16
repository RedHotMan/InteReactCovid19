import React from "react";
import { formatNumber } from "../../utils";
import {
  StyledPopup,
  StyledPopupHead,
  PopupCountryName,
  CountryFlag,
  PopupInfoList,
  ConfirmedItem,
  ActiveItem,
  ReconveredItem,
  DeathItem,
  ClosePopupBtn,
} from "./style";

const MapPopup = ({ country, closeCountryPopup }) => {
  return (
    <StyledPopup
      longitude={country.countryInfo.long}
      latitude={country.countryInfo.lat}
      closeButton={false}
      closeOnClick={false}
    >
      <StyledPopupHead>
        <PopupCountryName variant="h5">{country.country}</PopupCountryName>
        <CountryFlag src={country.countryInfo.flag} alt={country.country} />
      </StyledPopupHead>

      <PopupInfoList>
        <ConfirmedItem>{`${formatNumber(
          country.cases
        )} confirmed cases`}</ConfirmedItem>
        <ActiveItem>{`${formatNumber(
          country.active
        )} active cases`}</ActiveItem>
        <ReconveredItem>{`${formatNumber(
          country.recovered
        )} recovered`}</ReconveredItem>
        <DeathItem>{`${formatNumber(country.deaths)} deaths`}</DeathItem>
      </PopupInfoList>

      <ClosePopupBtn aria-label="add" onClick={closeCountryPopup}>
        <i className="ri-close-line"></i>
      </ClosePopupBtn>
    </StyledPopup>
  );
};

export default MapPopup;
