import React, { useState } from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";

import { mainTheme } from "../../../styled/config";
import TechnologyForm from "./TechnologyForm";

const GridContainerStyled = styled(Grid)`
  min-width: 150px;
  min-height: 150px;
`;

const IconButtonStyled = styled(IconButton)`
  border: dashed 2px ${mainTheme.palette.secondary.dark};
`;

export interface AddTechnologyProps {}

const AddTechnology: React.FC<AddTechnologyProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <GridContainerStyled
        container
        justify="space-around"
        alignItems="center"
        direction="column"
        onClick={() => setOpen(true)}
      >
        <Grid item>
          <Typography color="textPrimary">Add technology</Typography>
        </Grid>
        <Grid item>
          <IconButtonStyled onClick={() => {}}>
            <AddIcon fontSize="large" color="secondary" />
          </IconButtonStyled>
        </Grid>
      </GridContainerStyled>
      <TechnologyForm open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default AddTechnology;
