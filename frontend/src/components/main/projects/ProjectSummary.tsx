import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Grid, IconButton, Paper } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LanguageIcon from "@material-ui/icons/Language";

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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  color: white;
`);

const variantsContent = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.3,
      type: "tween",
    },
  },
};

export interface ProjectSummaryProps {
  project: Project;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ project }) => {
  const [focus, setFocus] = useState(false);

  return (
    <PaperItemStyled
      view={project.view}
      whileHover={{
        scale: 1.3,
        transition: { ease: "easeOut" },
      }}
      onHoverStart={() => setFocus(true)}
      onHoverEnd={() => setFocus(false)}
    >
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: "100%" }}
      >
        {focus ? (
          <>
            <AnimatePresence>
              <GridItemStyled
                item
                variants={variantsContent}
                initial="hidden"
                animate="visible"
              >
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>{project.name}</Grid>
                  <Grid item>
                    <Grid container spacing={1}>
                      {project.links?.github ? (
                        <Grid item>
                          <IconButton
                            color="secondary"
                            href={project.links.github}
                            target="_blank"
                            size="small"
                          >
                            <GitHubIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      ) : null}
                      {project.links?.www ? (
                        <Grid item>
                          <IconButton
                            color="secondary"
                            href={project.links.www}
                            target="_blank"
                            size="small"
                          >
                            <LanguageIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </GridItemStyled>
            </AnimatePresence>
            <AnimatePresence>
              <GridItemStyled
                item
                variants={variantsContent}
                initial="hidden"
                animate="visible"
              >
                Technologies
              </GridItemStyled>
            </AnimatePresence>
          </>
        ) : null}
      </Grid>
    </PaperItemStyled>
  );
};

export default ProjectSummary;
