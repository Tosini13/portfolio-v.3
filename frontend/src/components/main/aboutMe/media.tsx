import React from "react";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import CodeIcon from "@material-ui/icons/Code";

import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  color: inherit;
  display: block;
  text-decoration: none;
  width: 100%;
`;

export interface MediaProps {}

const Media: React.FC<MediaProps> = () => {
  return (
    <List>
      <ListItem>
        <LinkStyled to={"#"}>
          <Grid container>
            <Grid item>
              <ListItemIcon>
                <CodeIcon color="secondary" />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText primary={"Portfolio"} />
            </Grid>
          </Grid>
        </LinkStyled>
      </ListItem>
      <ListItem>
        <LinkStyled to={"#"}>
          <Grid container>
            <Grid item>
              <ListItemIcon>
                <GitHubIcon color="secondary" />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText primary={"GitHub"} />
            </Grid>
          </Grid>
        </LinkStyled>
      </ListItem>
      <ListItem>
        <LinkStyled to={"#"}>
          <Grid container>
            <Grid item>
              <ListItemIcon>
                <LinkedInIcon fontSize="small" color="secondary" />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText primary={"LinkedIn"} />
            </Grid>
          </Grid>
        </LinkStyled>
      </ListItem>
    </List>
  );
};

export default Media;
