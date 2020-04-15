import React, { lazy } from "react";
import { shallow } from "enzyme";
import Layout from "../../Components/Layout";

describe("Layout", () => {
  it("Should render Layout with Header and Loader", () => {
    const wrapper = shallow(<Layout />, { suspenseFallback: true });

    expect(wrapper.find("Header")).toHaveLength(1);
    expect(wrapper.find("Suspense")).toHaveLength(1);

    const suspenseComponent = wrapper.find("Suspense");

    expect(suspenseComponent.dive().find("Loader")).toHaveLength(1);
    expect(suspenseComponent.dive().find("lazy")).toHaveLength(0);
    expect(suspenseComponent.dive().find("Mapbox")).toHaveLength(0);
  });

  it("Should render Layout with Header and lazy function", () => {
    const wrapper = shallow(<Layout />, { suspenseFallback: false });

    expect(wrapper.find("Header")).toHaveLength(1);
    expect(wrapper.find("Suspense")).toHaveLength(1);

    const suspenseComponent = wrapper.find("Suspense");

    expect(suspenseComponent.dive().find("Loader")).toHaveLength(0);
    expect(suspenseComponent.dive().find("lazy")).toHaveLength(1);

    const lazyComponent = suspenseComponent.dive().find("lazy");
  });
});
