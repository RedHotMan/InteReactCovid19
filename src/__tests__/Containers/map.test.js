import React from "react";
import { mount } from "enzyme";
import Mapbox from "../../Containers/Map";
import ReactMapGl from "react-map-gl";
import { MapContainer } from "../../Containers/Map/style";

describe("Map", () => {
  const wrapper = mount(<Mapbox />);

  it("Render nicely", () => {
    expect(wrapper.find(MapContainer)).toHaveLength(1);
  });

  it("Should contain ReactMapGl", () => {
    const mapContainer = wrapper.find(MapContainer);
    expect(mapContainer.find(ReactMapGl)).toHaveLength(1);
  });

  it("Should render ReactMapGl with proper props", () => {
    const reactMapGl = wrapper.find(MapContainer).find(ReactMapGl);

    expect(reactMapGl.prop("minZoom")).toEqual(1);
    expect(reactMapGl.prop("zoom")).toEqual(2);
    expect(reactMapGl.prop("longitude")).toEqual(0);
    expect(reactMapGl.prop("latitude")).toEqual(0);
  });
});
