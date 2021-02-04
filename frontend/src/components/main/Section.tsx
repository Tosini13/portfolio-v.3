import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Grid } from "@material-ui/core";

const Container = motion.custom(styled(Grid)`
  position: relative;
  padding: 20px;
  min-height: 100vh;
  width: 50vw;
  margin: auto;
`);

const variantsDescription = {
  hidden: {
    y: "-100%",
    scale: 0.8,
  },
  visible: {
    y: 0,
    scale: 1,
  },
  exit: {
    y: "100%",
    scale: "0.8",
  },
};
export interface SectionComponentProps {
  title?: string;
  children?: React.ReactNode;
}

const SectionComponent: React.FC<SectionComponentProps> = ({ children }) => {
  return (
    <Container
      container
      justify="center"
      alignItems="center"
      variants={variantsDescription}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </Container>
  );
};

export default SectionComponent;
