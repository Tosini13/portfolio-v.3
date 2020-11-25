import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Technology } from "../../../../store/technology";

export interface TechnologyContentProps {
  tech: Technology;
}

const TechnologyContent: React.FC<TechnologyContentProps> = ({ tech }) => {
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
