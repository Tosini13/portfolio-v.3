import React, { useState } from "react";

import BuildIcon from "@material-ui/icons/Build";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";

import { Technology } from "../../../../store/technology";
import styled from "styled-components";
import logo from "../../../../images/react_logo.png";

import { ViewTechnologies } from "../index";
import { Id } from "../../../../models/types";
import TechnologyContent from "./Content";
import { parseStyledBoolean } from "../../../../models/global";
import { mainTheme } from "../../../../styled/config";

const gridView = {
  column: {
    container: {
      direction: "column" as any,
      spacing: 3,
    },
    item: {
      width_lg: 12 as any,
      width_xs: 12 as any,
    },
  },
  row: {
    container: {
      direction: "column" as any,
      spacing: 3,
    },
    item: {
      width_lg: 4 as any,
      width_xs: 12 as any,
    },
  },
};

const PaperItemStyled = styled(Paper)`
  position: relative;
  padding: 10px;
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
`;

const GridItemStyled = styled(Grid)`
  height: 100%;
  transition: all 300ms ease 0ms;
  cursor: pointer;
`;

const ImageGridStyled = styled(Grid)<{ moved?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: margin-left 0.3s;
  ${(props) => (props.moved ? `margin-left: 25%;` : `margin-left: 0px;`)}
`;

const ContentGridStyled = styled(Grid)<{ opened?: string }>`
  position: absolute;
  background-color: ${mainTheme.palette.primary.main};
  color: ${mainTheme.palette.secondary.main};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  top: 0%;
  left: 0%;
  height: 100%;
  width: 50%;
  transition: transform 0.3s;
  transform-origin: top left;
  ${(props) =>
    props.opened
      ? `transform: rotate(0deg)  translate(0px, 0px);`
      : `transform: rotate(80deg)  translate(0px, -35px)`}
`;

export interface TechnologyDetailsProps {
  tech: Technology;
  remove: (techId: Id) => Promise<void>;
  view: ViewTechnologies;
  action: boolean;
  handleOpen: (technology?: Technology) => void;
}

const TechnologyDetails: React.FC<TechnologyDetailsProps> = ({
  tech,
  remove,
  view,
  action,
  handleOpen,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  console.log(tech);
  return (
    <GridItemStyled
      item
      lg={gridView[view].item.width_lg}
      xs={gridView[view].item.width_xs}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      <PaperItemStyled>
        <Grid container spacing={2} alignItems="center">
          <ImageGridStyled
            item
            moved={parseStyledBoolean(hovered || view !== ViewTechnologies.row)}
          >
            {logo ? (
              <img src={tech.logo} alt="logo" style={{ width: "100px" }} />
            ) : (
              <BuildIcon fontSize="large" />
            )}
          </ImageGridStyled>
          <ContentGridStyled
            item
            opened={parseStyledBoolean(
              hovered || view !== ViewTechnologies.row
            )}
          >
            <TechnologyContent
              tech={tech}
              remove={remove}
              action={action}
              handleOpen={handleOpen}
            />
          </ContentGridStyled>
        </Grid>
      </PaperItemStyled>
    </GridItemStyled>
  );
};

export default TechnologyDetails;
