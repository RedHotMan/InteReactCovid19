import React from "react";
import { shallow } from "enzyme";
import Loader from "../../Components/Loader";

describe("Loader", () => {
  it("Should render Loader correctly", () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
