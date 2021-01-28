import styled from "styled-components";
import { mainTheme } from "./config";

import { Dialog } from "@material-ui/core";

export const DialogStyled = styled(Dialog)`
  .MuiPaper-root {
    background-color: ${mainTheme.palette.primary.main};
  }
`;
