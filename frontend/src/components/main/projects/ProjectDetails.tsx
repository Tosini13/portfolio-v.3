import React, { useContext, useEffect } from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Project } from "../../../store/project";
import { PaperItemStyled } from "./ProjectSummary";
import { AnimatePresence, motion } from "framer-motion";
import { StoreTechnologiesContext } from "../../../store/technology";
import { parseStyledBoolean } from "../../../models/global";
import { Close } from "@material-ui/icons";

const GridContainerStyled = motion.custom(styled(Grid)`
  height: 100%;
`);

const GridContentStyled = styled(Grid)<{ color: string | number }>`
  position: relative;
  box-shadow: -5px 0px 4px rgba(0, 0, 0, 0.25);
  ${(props) =>
    props.color
      ? `background-color: ${props.color};`
      : "background-color: transparent"};
`;

const GridItemPaperStyled = styled(Grid)`
  transform: translateX(-30%);
`;

const PaperStyled = styled(PaperItemStyled)`
  position: relative;
  width: 100%;
  height: 400px;
`;

const TechnologiesGridContainerStyled = styled(Grid)`
  position: absolute;
  right: -5px;
  transform: translateX(100%);
`;

const CloseIconButtonStyled = styled(IconButton)`
  position: absolute;
  left: 5px;
  top: 5px;
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
  handleClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  handleClose,
}) => {
  const color = "darkgoldenrod"; // TODO: choose color for each project

  const technologiesStore = useContext(StoreTechnologiesContext);
  const { technologies, fetch } = technologiesStore;

  useEffect(() => {
    fetch();
  }, [fetch]);

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
                <GridItemPaperStyled item>
                  {project?.view ? (
                    <PaperStyled
                      layoutId={`projectLayout${project.id}`}
                      view={project?.view}
                    >
                      <TechnologiesGridContainerStyled
                        container
                        direction="column"
                      >
                        {technologies.map((tech) => (
                          <Grid item key={tech.id}>
                            <img
                              src={tech.logo}
                              alt="logo"
                              style={{ height: "50px" }}
                            />
                          </Grid>
                        ))}
                      </TechnologiesGridContainerStyled>
                    </PaperStyled>
                  ) : null}
                </GridItemPaperStyled>
                <Grid item>
                  <Typography>{project?.description}</Typography>
                </Grid>
              </Grid>
              <CloseIconButtonStyled onClick={handleClose}>
                <Close />
              </CloseIconButtonStyled>
            </GridContentStyled>
          </GridContainerStyled>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default ProjectDetails;
