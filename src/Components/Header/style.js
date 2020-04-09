import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import styled from "styled-components";

export const StyledAppBar = styled(AppBar)`
  background-color: #1f3349 !important;
`;

export const StyledToolabr = styled(Toolbar)`
  height: 2.5rem;
  min-height: 0 !important;
`;

export const StyledTypographyTitle = styled(Typography)`
  margin: 0 0.5rem !important;
  flex-grow: 1;
`;

export const GithubBtn = styled(IconButton)`
  &&& {
    color: #fff;
  }
`;
