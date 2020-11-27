import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import SectionComponent from "../Section";
import ProjectSummary from "./ProjectSummary";
import { Project, StoreProjectsContext } from "../../../store/project";
import SpeedDialComponent from "../../global/SpeedDial";
import ProjectForm from "./ProjectForm";

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = observer(() => {
  const technologiesStore = useContext(StoreProjectsContext);
  const { projects, fetch } = technologiesStore;

  useEffect(() => {
    fetch();
  }, [fetch]);

  const [edit, setEdit] = useState<Project | boolean>();
  const [action, setAction] = useState<boolean>(false);

  const handleInactivate = () => {
    setAction(false);
  };

  const handleActivate = () => {
    setAction(true);
  };

  const handleClose = () => {
    setEdit(false);
  };

  const handleOpen = (project?: Project) => {
    setEdit(project ? project : true);
  };

  const actions = [
    { icon: <AddIcon onClick={() => handleOpen()} />, name: "Add" },
    { icon: <EditIcon onClick={handleActivate} />, name: "Edit" },
  ];

  return (
    <SectionComponent title={"Projects"}>
      <Grid container spacing={3} alignItems="center" justify="space-evenly">
        {projects.map((project) => (
          <Grid item key={project.id}>
            <ProjectSummary project={project} />
          </Grid>
        ))}
      </Grid>
      <SpeedDialComponent
        actions={actions}
        blocked={action}
        unBlock={handleInactivate}
      />
      <ProjectForm
        open={Boolean(edit)}
        project={typeof edit === "object" ? edit : undefined}
        handleClose={handleClose}
      />
    </SectionComponent>
  );
});

export default Projects;
