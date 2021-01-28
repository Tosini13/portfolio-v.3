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
import TechnologyForm from "./TechnologyForm";
import TechnologyDetails from "./details/TechnologySummary";
import AddTechnology from "./add";
import styled from "styled-components";
import { mainTheme } from "../../../styled/config";

const GridItemStyled = styled(Grid)`
  box-sizing: content-box;
`;

const GridAddItemStyled = styled(GridItemStyled)`
  border: dashed 2px ${mainTheme.palette.secondary.dark};
  border-radius: 5px;
  transition: all ease-out 0.2s;
  &:hover {
    border-color: ${mainTheme.palette.secondary.light};
  }
`;

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
        {technologies.map((tech) => (
          <GridItemStyled item sm={2} key={tech.id}>
            <TechnologyDetails
              tech={tech}
              remove={() => remove(tech.id)}
              view={view}
              action={action}
              handleOpen={handleOpen}
            />
          </GridItemStyled>
        ))}
        <GridAddItemStyled item sm={2}>
          <AddTechnology />
        </GridAddItemStyled>
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
