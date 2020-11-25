import React from "react";
import { motion } from "framer-motion";

import { Grid, Paper } from "@material-ui/core";

import { Project } from "../../../store/project";
import styled from "styled-components";

const PaperItemStyled = motion.custom(styled(Paper)<{ view: string }>`
  position: relative;
  cursor: pointer;
  width: 300px;
  height: 200px;
  box-sizing: border-box;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  ${(props) => (props.view ? `background-image: url('${props.view}');` : ``)}
`);

const GridItemStyled = motion.custom(styled(Grid)`
  background-color: rgba(0, 0, 0, 0.3);
`);

export interface ProjectSummaryProps {
  project: Project;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ project }) => {
  return (
    <PaperItemStyled
      view={project.logo}
      whileHover={{
        scale: 1.3,
        transition: { type: "spring", stiffness: 400 },
      }}
    >
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: "100%" }}
      >
        <GridItemStyled item>{project.name}</GridItemStyled>
        <GridItemStyled item>{project.name}</GridItemStyled>
      </Grid>
    </PaperItemStyled>
  );
};

export default ProjectSummary;
