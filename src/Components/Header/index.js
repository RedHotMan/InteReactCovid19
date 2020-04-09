import React from "react";
import {
  StyledAppBar,
  StyledToolabr,
  StyledTypographyTitle,
  GithubBtn,
} from "./style";

export default function Header() {
  return (
    <StyledAppBar position="static">
      <StyledToolabr>
        <i className="ri-earth-line"></i>
        <StyledTypographyTitle variant="subtitle2">
          InteReactCovid19
        </StyledTypographyTitle>
        <GithubBtn
          onClick={() => window.open("https://github.com/RedHotMan", "_self")}
        >
          <i className="ri-github-fill"></i>
        </GithubBtn>
      </StyledToolabr>
    </StyledAppBar>
  );
}
