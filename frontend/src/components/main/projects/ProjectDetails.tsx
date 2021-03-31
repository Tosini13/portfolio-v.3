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
  margin: 10px;
  position: relative;
`);

const GridContentStyled = styled(Grid)<{ color: string | number }>`
  background-color: transparent;
  border: black solid 1.2px;
  border-radius: 2px;
  ${(props) =>
    props.color ? `border-color: ${props.color};` : "border-color: black"};
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

const TitleStyled = styled(Typography)`
  font-family: system-ui;
  text-shadow: 5px 5px rgba(0, 0, 0, 0.3);
`;

const variantsContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};
export interface ProjectDetailsProps {
  project?: Project;
  handleClose: () => void;
  index: number;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  handleClose,
  index,
}) => {
  const color = ["rgba(0,0,0,0.2)", "#2c8f62", "black"]; // TODO: choose color for each project

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
            <GridContentStyled item md={8} color={color[index % color.length]}>
              <Grid
                container
                direction="column"
                style={{ height: "100%", padding: "10px" }}
                spacing={3}
              >
                <Grid item>
                  <TitleStyled variant="h3" align="center">
                    {project?.name}
                  </TitleStyled>
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
                              style={{
                                height: "50px",
                              }}
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
            </GridContentStyled>
            <CloseIconButtonStyled onClick={handleClose}>
              <Close />
            </CloseIconButtonStyled>
          </GridContainerStyled>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default ProjectDetails;
