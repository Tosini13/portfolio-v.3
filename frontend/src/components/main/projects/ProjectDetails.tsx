import React from "react";

import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Project } from "../../../store/project";
import { PaperItemStyled } from "./ProjectSummary";
import { AnimatePresence, motion } from "framer-motion";

const GridContainerStyled = motion.custom(styled(Grid)`
  height: 100%;
`);

const GridContentStyled = styled(Grid)<{ color: string | number }>`
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  ${(props) =>
    props.color
      ? `background-color: ${props.color};`
      : "background-color: transparent"};
`;

const PaperStyled = styled(PaperItemStyled)`
  width: 100%;
  height: 400px;
  transform: translateX(-30%);
`;

const variantsContainer = {
  hidden: {
    x: 300,
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};
export interface ProjectDetailsProps {
  project?: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const color = "darkgoldenrod";
  return (
    <>
      {project?.view ? (
        <AnimatePresence>
          <GridContainerStyled
            container
            variants={variantsContainer}
            initial="hidden"
            animate="visible"
          >
            <Grid item md={4}></Grid>
            <GridContentStyled item md={8} color={color}>
              <Grid
                container
                direction="column"
                style={{ height: "100%", padding: "10px" }}
                spacing={3}
              >
                <Grid item>
                  <Typography variant="h3" align="center">
                    {project?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  {project?.view ? (
                    <PaperStyled view={project?.view}></PaperStyled>
                  ) : null}
                </Grid>
                <Grid item>
                  <Typography>{project?.description}</Typography>
                </Grid>
              </Grid>
            </GridContentStyled>
          </GridContainerStyled>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default ProjectDetails;
