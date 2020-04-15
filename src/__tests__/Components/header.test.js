import React from "react";
import { shallow } from "enzyme";
import Header from "../../Components/Header";
import {
  StyledAppBar,
  StyledToolbar,
  StyledTypographyTitle,
  GithubBtn,
} from "../../Components/Header/style";

describe("Header", () => {
  const wrapper = shallow(<Header />);

  it("Should render Header correctly", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("Should render a TopBar with a title and github button", () => {
    expect(wrapper.find(StyledAppBar)).toHaveLength(1);

    const appBar = wrapper.find(StyledAppBar);

    expect(appBar.find(StyledToolbar)).toHaveLength(1);

    const toolBar = appBar.find(StyledToolbar);

    expect(toolBar.contains(<i className="ri-earth-line"></i>)).toBeTruthy();
    expect(toolBar.contains("InteReactCovid19")).toBeTruthy();
    expect(toolBar.find(StyledTypographyTitle)).toHaveLength(1);
    expect(toolBar.find(GithubBtn)).toHaveLength(1);

    const gitHubBtn = toolBar.find(GithubBtn);

    expect(gitHubBtn.contains(<i className="ri-github-fill"></i>)).toBeTruthy();
  });
});
