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
import ProjectDetails from "./ProjectDetails";
import { AnimateSharedLayout, motion } from "framer-motion";

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = observer(() => {
  const technologiesStore = useContext(StoreProjectsContext);
  const { projects, fetch } = technologiesStore;

  const [selected, setSelected] = useState<Project | undefined>();

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
      <Grid container style={{ height: "100vh" }}>
        <AnimateSharedLayout>
          <Grid item md={4}>
            <Grid
              container
              spacing={3}
              direction="column"
              style={{ padding: "25px 15px" }}
            >
              {projects.map((project) => (
                <Grid item key={project.id} style={{ height: "100px" }}>
                  {selected?.id === project.id ? null : (
                    <motion.div layoutId={`projectLayout${project.id}`}>
                      <ProjectSummary
                        handleOpen={handleOpen}
                        project={project}
                        selected={false}
                        action={action}
                        handleOpenProject={() => setSelected(project)}
                      />
                    </motion.div>
                  )}
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
          </Grid>
          <Grid item md={8}>
            {projects.map((project) => {
              if (selected?.id === project.id) {
                return (
                  <ProjectDetails
                    key={project.id}
                    project={project}
                    handleClose={() => setSelected(undefined)}
                  />
                );
              }
              return null;
            })}
          </Grid>
        </AnimateSharedLayout>
      </Grid>
    </SectionComponent>
  );
});

export default Projects;
