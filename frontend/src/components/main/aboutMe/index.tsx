import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";
import SectionComponent from "../Section";
import styled from "styled-components";
import ProfileSideBar from "./ProfileSideBar";
import Menu from "../../../components/menu";

const PaperStyled = styled(Paper)`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
`;

export interface aboutMeProps {}

const AboutMe: React.FC<aboutMeProps> = () => {
  return (
    <SectionComponent title={"About me"}>
      <PaperStyled>
        <Typography>
          Sono un web sviluppatore. Voglio lavorare nella buona compagna e si
          crescere. Voglio vivere in Italia e vedere il sole ogni giorno. Sono
          un web sviluppatore. Voglio lavorare nella buona compagna e si
          crescere. Voglio vivere in Italia e vedere il sole ogni giorno.
          <br />
          <br />
          Sono un web sviluppatore. Voglio lavorare nella buona compagna e si
          crescere. Voglio vivere in Italia e vedere il sole ogni giorno. Sono
          un web sviluppatore. Voglio lavorare nella buona compagna e si
          crescere. Voglio vivere in Italia e vedere il sole ogni giorno.
        </Typography>
      </PaperStyled>
    </SectionComponent>
  );
};

export default AboutMe;
