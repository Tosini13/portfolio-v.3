import React from "react";
import styled from "styled-components";

import { Grid, Typography } from "@material-ui/core";
import me from "../../../images/me.jpeg";
import Media from "./media";

const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 10px;
`;

const ImgStyled = styled.img`
  width: 100%;
  border-radius: 5px;
`;

export interface ProfileSideBarProps {}

const ProfileSideBar: React.FC<ProfileSideBarProps> = () => {
  return (
    <Container>
      <Grid
        container
        direction="column"
        spacing={1}
        style={{ position: "sticky", maxWidth: "150px" }}
      >
        <Grid item>
          <ImgStyled src={me} />
        </Grid>
        <Grid item>
          <Typography
            variant="h5"
            color="textPrimary"
            style={{ textAlign: "center" }}
          >
            Front End <br /> Developer
          </Typography>
        </Grid>
        <Grid item>
          <Media />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileSideBar;
