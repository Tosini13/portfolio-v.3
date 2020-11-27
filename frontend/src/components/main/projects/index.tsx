import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Grid } from "@material-ui/core";

import { StoreTechnologiesContext } from "../../../store/technology";

import SectionComponent from "../Section";
import ProjectSummary from "./ProjectSummary";

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = observer(() => {
  const technologiesStore = useContext(StoreTechnologiesContext);
  const { technologies: projects, fetch } = technologiesStore;

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <SectionComponent title={"Projects"}>
      <Grid container spacing={3} alignItems="center" justify="space-evenly">
        {projects.map((project) => (
          <Grid item>
            <ProjectSummary project={project} />
          </Grid>
        ))}
      </Grid>
    </SectionComponent>
  );
});

export default Projects;
