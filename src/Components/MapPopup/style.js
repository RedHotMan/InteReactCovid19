import styled from "styled-components";
import { Popup } from "react-map-gl";
import { Typography, Fab } from "@material-ui/core";

export const StyledPopup = styled(Popup)`
  &&& {
    min-width: 8rem;
  }

  &&& .mapboxgl-popup-content {
    background-color: #1f3349;
    color: #fff;
    padding: 1.1rem;
  }

  &.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: #1f3349;
  }

  &.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: #1f3349;
  }

  &.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
  &.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip,
  &.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
    border-top-color: #1f3349;
  }

  &.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
  &.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip,
  &.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
    border-bottom-color: #1f3349;
  }
`;

export const StyledPopupHead = styled.div`
  display: flex;
  align-items: center;
`;

export const PopupCountryName = styled(Typography)`
  &&& {
    font-weight: 700;
  }
`;

export const PopupInfoList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 0.8rem;
`;

export const ReconveredItem = styled.li`
  color: #64c275;
`;
export const ConfirmedItem = styled.li`
  color: #e66a7d;
`;
export const ActiveItem = styled.li`
  color: #ffc00c;
`;
export const DeathItem = styled.li`
  color: #a9a7a3;
`;

export const CountryFlag = styled.img`
  height: 1rem;
  margin: 0 0.5rem;
`;

export const ClosePopupBtn = styled(Fab)`
  &&& {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    min-height: 0;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
