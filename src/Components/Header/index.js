import React from "react";
import {
  StyledAppBar,
  StyledToolbar,
  StyledTypographyTitle,
  GithubBtn,
} from "./style";

export default function Header() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <i className="ri-earth-line"></i>
        <StyledTypographyTitle variant="subtitle2">
          InteReactCovid19
        </StyledTypographyTitle>
        <GithubBtn
          onClick={() =>
            window.open(
              "https://github.com/RedHotMan/InteReactCovid19",
              "_self"
            )
          }
        >
          <i className="ri-github-fill"></i>
        </GithubBtn>
      </StyledToolbar>
    </StyledAppBar>
  );
}
