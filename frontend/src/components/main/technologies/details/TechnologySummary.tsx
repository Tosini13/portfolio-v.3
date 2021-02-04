import React, { useState } from "react";
import { AnimateSharedLayout, motion } from "framer-motion";

import BuildIcon from "@material-ui/icons/Build";

import { Technology } from "../../../../store/technology";
import logo from "../../../../images/react_logo.png";

import { ViewTechnologies } from "../index";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { parseStyledBoolean } from "../../../../models/global";
import TechnologyDetails from "./TechnologyDetails";

const GridContainerStyled = motion.custom(styled(Grid)`
  cursor: pointer;
  transition: all ease-out 0.2s;
  padding: 5%;
  position: relative;
  &:hover {
    padding: 0%;
  }
`);

export const GridItemStyled = styled(Grid)`
  height: 100%;
  cursor: pointer;
  position: relative;
  min-width: 200px;
  min-height: 200px;
`;

export const ImageGridStyled = styled(Grid)<{ moved?: string }>`
  transition: all ease-in 0.3s;
`;

export interface TechnologySummaryProps {
  tech: Technology;
  remove: () => Promise<void>;
  view: ViewTechnologies;
  action: boolean;
  handleOpen: (technology?: Technology) => void;
}

const TechnologySummary: React.FC<TechnologySummaryProps> = ({
  tech,
  remove,
  view,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AnimateSharedLayout type="crossfade">
      {open ? (
        <TechnologyDetails
          tech={tech}
          remove={remove}
          handleClose={() => setOpen(false)}
        />
      ) : (
        <GridContainerStyled
          container
          spacing={2}
          alignItems="center"
          justify="space-evenly"
          wrap="nowrap"
          onClick={() => setOpen(true)}
          layoutId={`techLayout${tech.id}`}
        >
          <ImageGridStyled
            item
            moved={parseStyledBoolean(open || view !== ViewTechnologies.row)}
          >
            {logo ? (
              <img src={tech.logo} alt="logo" style={{ width: "100%" }} />
            ) : (
              <BuildIcon fontSize="large" />
            )}
          </ImageGridStyled>
        </GridContainerStyled>
      )}
    </AnimateSharedLayout>
  );
};

export default TechnologySummary;
