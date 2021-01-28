import React, { useState } from "react";

import { Button, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MenuList from "./MenuList";
import { AnimateSharedLayout, motion } from "framer-motion";
import styled from "styled-components";

const SideMenuContainer = motion.custom(styled.div`
  width: 100%;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  overflow: hidden;
`);

const MiddleMenuContainer = motion.custom(styled.div`
  position: relative;
  padding: 10px;
  background-color: transparent;
`);

export interface SideMenuProps {}
const SideMenu: React.FC<SideMenuProps> = ({ children }) => (
  <SideMenuContainer layoutId={"MainMenuLayout"}>{children}</SideMenuContainer>
);

export interface MiddleMenuProps {}
const MiddleMenu: React.FC<MiddleMenuProps> = ({ children }) => (
  <MiddleMenuContainer layoutId={"MainMenuLayout"}>
    {children}
  </MiddleMenuContainer>
);

export interface MenuProps {
  expanded: boolean;
}

const Menu: React.FC<MenuProps> = ({ expanded }) => {
  const [side, setSide] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const toggleSideBar = () => {
    setSide(!side);
  };
  return (
    <>
      <IconButton
        color="secondary"
        onClick={toggleSideBar}
        style={{ position: "fixed", right: 10, top: 10 }}
      >
        <MenuIcon color="primary" />
      </IconButton>
      <AnimateSharedLayout type="crossfade">
        {expanded ? (
          <SideMenu>
            <MenuList />
          </SideMenu>
        ) : (
          <MiddleMenu>
            <MenuList />
          </MiddleMenu>
        )}
      </AnimateSharedLayout>
    </>
  );
};

export default Menu;
