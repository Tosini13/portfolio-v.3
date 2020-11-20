import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { Grid, IconButton, Typography } from "@material-ui/core";

import { Technology } from "../../../../store/technology";
import styled from "styled-components";
import { parseStyledBoolean } from "../../../../models/global";

import { Id } from "../../../../models/types";

const ActionGridStyled = styled(Grid)<{ active?: string }>`
  ${(props) => (props.active ? `display: block` : `display: none`)}
`;

export interface TechnologyContentProps {
  tech: Technology;
  remove: (techId: Id) => Promise<void>;
  action: boolean;
  handleOpen: (technology?: Technology) => void;
}

const TechnologyContent: React.FC<TechnologyContentProps> = ({
  tech,
  remove,
  action,
  handleOpen,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item style={{ width: "100%" }}>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item style={{ width: "100%" }}>
            <Typography color="secondary" variant="h5" align="center">
              {tech.name}
            </Typography>
          </Grid>
          <ActionGridStyled item active={parseStyledBoolean(action)}>
            <IconButton size="small" onClick={() => handleOpen(tech)}>
              <EditIcon color="secondary" fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => remove(tech.id)}>
              <DeleteForeverIcon color="secondary" fontSize="small" />
            </IconButton>
          </ActionGridStyled>
        </Grid>
      </Grid>
      <Grid item>
        <Typography color="secondary" variant="body1">
          {tech.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TechnologyContent;
