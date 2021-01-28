import React from "react";
import { Grid } from "@material-ui/core";
import Menu from "../menu";
import ProfileSideBar from "./aboutMe/ProfileSideBar";
import styled from "styled-components";
import { mainTheme } from "../../styled/config";

const BodyGridContainer = styled(Grid)`
  background-color: ${mainTheme.palette.primary.dark};
  positoin: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
`;

const BodyGridItem = styled(Grid)`
  height: 100%;
  max-height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export interface BodyProps {
  expanded: boolean;
  handleScroll: () => void;
}

const Body: React.FC<BodyProps> = ({ children, expanded, handleScroll }) => {
  return (
    <BodyGridContainer
      container
      alignItems="center"
      justify="center"
      style={{ width: "100%" }}
    >
      <Grid item lg={2}>
        <Menu expanded={expanded} />
      </Grid>
      <BodyGridItem
        item
        lg={expanded ? 8 : 2}
        onScroll={handleScroll}
        id="main-container"
      >
        {children}
      </BodyGridItem>
      <Grid item lg={2}>
        <ProfileSideBar />
      </Grid>
    </BodyGridContainer>
  );
};

export default Body;
