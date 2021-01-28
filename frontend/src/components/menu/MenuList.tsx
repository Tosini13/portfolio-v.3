import React from "react";

import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import BuildIcon from "@material-ui/icons/Build";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { LocationConst } from "../../models/const";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { motion } from "framer-motion";

const LinkStyled = styled(Link)`
  color: inherit;
  display: block;
  text-decoration: none;
  width: 100%;
`;

export interface MenuListProps {}

const MenuList: React.FC<MenuListProps> = () => {
  return (
    <List style={{ color: "white" }}>
      <ListItem button>
        <LinkStyled to={LocationConst.aboutMe}>
          <Grid container>
            <Grid item>
              <ListItemIcon>
                <EmojiPeopleIcon color="secondary" />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText primary={"About me"} />
            </Grid>
          </Grid>
        </LinkStyled>
      </ListItem>
      <Divider />
      <ListItem button>
        <LinkStyled to={LocationConst.skills}>
          <Grid container>
            <Grid item>
              <ListItemIcon>
                <TrendingUpIcon color="secondary" />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText primary={"Skills"} />
            </Grid>
          </Grid>
        </LinkStyled>
      </ListItem>
      <ListItem button>
        <LinkStyled to={LocationConst.technologies}>
          <Grid container>
            <Grid item>
              <ListItemIcon>
                <BuildIcon color="secondary" />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText primary={"Technologies"} />
            </Grid>
          </Grid>
        </LinkStyled>
      </ListItem>
      <ListItem button>
        <LinkStyled to={LocationConst.projects}>
          <Grid container>
            <Grid item>
              <ListItemIcon>
                <LaptopMacIcon color="secondary" />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText primary={"Projects"} />
            </Grid>
          </Grid>
        </LinkStyled>
      </ListItem>
    </List>
  );
};

export default MenuList;
