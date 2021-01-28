import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BuildIcon from "@material-ui/icons/Build";
import { Paper } from "@material-ui/core";

import { Technology } from "../../../../store/technology";
import logo from "../../../../images/react_logo.png";

import { ViewTechnologies } from "../index";
import { Id } from "../../../../models/types";
import TechnologyContent from "./Content";
import { mainTheme } from "../../../../styled/config";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import { Grid, IconButton } from "@material-ui/core";
import { parseStyledBoolean } from "../../../../models/global";

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

export const PaperItemStyled = styled(Paper)<{ opened?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  padding: 7%;
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: transparent;
  margin: 1px;
  transition: all ease-in 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 5%;
  }
  ${(props) =>
    props.opened
      ? `
  width: 200%;`
      : ``}
`;

export const GridItemStyled = styled(Grid)`
  height: 100%;
  cursor: pointer;
  position: relative;
`;

const ImageGridStyled = styled(Grid)<{ moved?: string }>`
  transition: all ease-in 0.3s;
`;

const ContentGridStyled = motion.custom(styled(Grid)<{ opened?: string }>`
  color: ${mainTheme.palette.secondary.main};
`);

const ActionGridStyled = styled(Grid)<{ active?: string }>`
  position: absolute;
  right: 0px;
  top: 0px;
  ${(props) => (props.active ? `display: block` : `display: none`)}
`;

const variantsDescription = {
  hidden: {
    x: 200,
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export interface TechnologySummaryProps {
  tech: Technology;
  remove: (techId: Id) => Promise<void>;
  view: ViewTechnologies;
  action: boolean;
  handleOpen: (technology?: Technology) => void;
}

const TechnologySummary: React.FC<TechnologySummaryProps> = ({
  tech,
  remove,
  view,
  action,
  handleOpen,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <GridItemStyled
      item
      lg={gridView[view].item.width_lg}
      xs={gridView[view].item.width_xs}
      onClick={() => setOpen(!open)}
    >
      <PaperItemStyled opened={parseStyledBoolean(open)}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="space-evenly"
          wrap="nowrap"
        >
          <ImageGridStyled
            item
            moved={parseStyledBoolean(open || view !== ViewTechnologies.row)}
            xs={open ? 3 : 12}
          >
            {logo ? (
              <img src={tech.logo} alt="logo" style={{ width: "100%" }} />
            ) : (
              <BuildIcon fontSize="large" />
            )}
          </ImageGridStyled>
          <AnimatePresence>
            {open ? (
              <ContentGridStyled
                item
                opened={parseStyledBoolean(
                  open || view !== ViewTechnologies.row
                )}
                xs={9}
                variants={variantsDescription}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <TechnologyContent tech={tech} />
              </ContentGridStyled>
            ) : null}
          </AnimatePresence>
          <ActionGridStyled item active={parseStyledBoolean(action)}>
            <IconButton onClick={() => handleOpen(tech)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => remove(tech.id)}>
              <DeleteForeverIcon color="primary" />
            </IconButton>
          </ActionGridStyled>
        </Grid>
      </PaperItemStyled>
    </GridItemStyled>
  );
};

export default TechnologySummary;
