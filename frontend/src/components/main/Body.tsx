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

const SideContainer = styled.div`
  width: 25vw;
  min-width: 210px;
  position: fixed;
  top: 0px;
`;

const LeftSideContainer = styled(SideContainer)`
  left: 0px;
  border: black solid 1px;
`;

const RightSideContainer = styled(SideContainer)`
  right: 0px;
  border: black solid 1px;
`;

export interface BodyProps {
  expanded: boolean;
}

const Body: React.FC<BodyProps> = ({ expanded }) => {
  return (
    <>
      <LeftSideContainer>
        <Menu expanded={expanded} />
      </LeftSideContainer>
      <RightSideContainer>
        <ProfileSideBar />
      </RightSideContainer>
    </>
  );
};

export default Body;
