import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import GitHubIcon from "@material-ui/icons/GitHub";
import LanguageIcon from "@material-ui/icons/Language";
import { Grid, IconButton, Paper } from "@material-ui/core";

import { Project, StoreProjectsContext } from "../../../store/project";
import styled from "styled-components";

export const PaperItemStyled = motion.custom(styled(Paper)<{ view?: string }>`
  position: relative;
  cursor: pointer;
  width: 300px;
  height: 200px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: cover;
  ${(props) => (props.view ? `background-image: url('${props.view}');` : ``)}
`);

const GridItemStyled = motion.custom(styled(Grid)`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 2px;
  color: white;
  position: absolute;
  right: 2px;
  top: 2px;
`);

const ActionProjectStyled = motion.custom(styled(Grid)`
  position: absolute;
  top: 0px;
  right: 0px;
`);

const variantsContent = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};

const variantsPaper = {
  hidden: {},
  visible: {
    opacity: 1,
    y: "-105%",
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const variantsActions = {
  initial: {
    rotateX: 4.2,
    rotateY: 3.2,
    rotateZ: 3.2,
    zIndex: 1,
  },
};

export interface ProjectSummaryProps {
  project: Project;
  action: boolean;
  handleOpen: (project: Project) => void;
  handleOpenProject: () => void;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
  project,
  action,
  handleOpen,
  handleOpenProject,
}) => {
  const technologiesStore = useContext(StoreProjectsContext);
  const { remove } = technologiesStore;
  const [focus, setFocus] = useState(false);

  return (
    <PaperItemStyled
      view={project.view}
      variants={variantsActions}
      initial="initial"
      whileHover={
        action
          ? {}
          : {
              zIndex: 2,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
              scale: 1.2,
              x: 20,
              transition: { ease: "easeOut" },
            }
      }
      onHoverStart={() => setFocus(true)}
      onHoverEnd={() => setFocus(false)}
      onClick={handleOpenProject}
    >
      <AnimatePresence>
        {action ? (
          <ActionProjectStyled
            item
            variants={variantsActions}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <IconButton onClick={() => handleOpen(project)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => remove(project.id)}>
              <DeleteForeverIcon color="primary" />
            </IconButton>
          </ActionProjectStyled>
        ) : null}
      </AnimatePresence>
      {focus ? (
        <AnimatePresence>
          <GridItemStyled
            item
            variants={variantsContent}
            initial="hidden"
            animate="visible"
          >
            {project.description}
          </GridItemStyled>
        </AnimatePresence>
      ) : null}
    </PaperItemStyled>
  );
};

export default ProjectSummary;
