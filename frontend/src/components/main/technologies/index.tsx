import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import AppsIcon from "@material-ui/icons/Apps";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";

import {
  StoreTechnologiesContext,
  Technology,
} from "../../../store/technology";
import SectionComponent from "../Section";
import SpeedDialComponent from "../../global/SpeedDial";
import TechnologyForm from "./Form";
import TechnologyDetails from "./details/TechnologyDetails";

export enum ViewTechnologies {
  column = "column",
  row = "row",
}

const Technologies: React.FC = observer(() => {
  const technologiesStore = useContext(StoreTechnologiesContext);
  const { technologies, fetch, remove } = technologiesStore;

  useEffect(() => {
    fetch();
  }, [fetch]);
  console.log(technologies);

  const [edit, setEdit] = useState<Technology | boolean>();
  const [action, setAction] = useState<boolean>(false);
  const [view, setView] = useState<ViewTechnologies>(ViewTechnologies.row);

  const handleInactivate = () => {
    setAction(false);
  };

  const handleActivate = () => {
    setAction(true);
  };

  const handleClose = () => {
    setEdit(false);
  };

  const handleOpen = (technology?: Technology) => {
    setEdit(technology ? technology : true);
  };

  const actions = [
    { icon: <AddIcon onClick={() => handleOpen()} />, name: "Add" },
    { icon: <EditIcon onClick={handleActivate} />, name: "Edit" },
    {
      icon: <ViewStreamIcon onClick={() => setView(ViewTechnologies.column)} />,
      name: "Show columns",
    },
    {
      icon: <AppsIcon onClick={() => setView(ViewTechnologies.row)} />,
      name: "Show rows",
    },
  ];

  return (
    <SectionComponent title={"Technologies"}>
      <Grid container spacing={2} alignItems="center" justify="space-around">
        {technologies.map((tech) => {
          console.log(tech);
          return (
            <TechnologyDetails
              key={tech.id}
              tech={tech}
              remove={remove}
              view={view}
              action={action}
              handleOpen={handleOpen}
            />
          );
        })}
      </Grid>
      <SpeedDialComponent
        actions={actions}
        blocked={action}
        unBlock={handleInactivate}
      />
      <TechnologyForm
        open={Boolean(edit)}
        technology={typeof edit === "object" ? edit : undefined}
        handleClose={handleClose}
      />
    </SectionComponent>
  );
});

export default Technologies;
