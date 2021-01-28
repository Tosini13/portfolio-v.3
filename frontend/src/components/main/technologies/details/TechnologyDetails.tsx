import React from "react";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { DialogTitle, Grid, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import styled from "styled-components";
import { parseStyledBoolean } from "../../../../models/global";
import { Technology } from "../../../../store/technology";
import { DialogStyled } from "../../../../styled/components";
import { motion } from "framer-motion";

const ActionGridStyled = styled(Grid)<{ active?: string }>`
  position: absolute;
  right: 0px;
  top: 0px;
  ${(props) => (props.active ? `display: block` : `display: none`)}
`;

const GridContainerStyled = motion.custom(styled(Grid)`
  position: absolute;
  max-width: 300px;
  top: 45%;
  left: 45%;
  index-z: 12;
  background-color: white;
  padding: 20px;
  transition: translate(-50%-50%);
  border-radius: 5px;
`);

export interface TechnologyDetailsProps {
  tech: Technology;
  remove: () => Promise<void>;
  handleClose: () => void;
}

const TechnologyDetails: React.FC<TechnologyDetailsProps> = ({
  tech,
  remove,
  handleClose,
}) => {
  const isAdmin = true;
  return (
    <GridContainerStyled
      layoutId={`techLayout${tech.id}`}
      onClick={handleClose}
    >
      <DialogTitle>{tech.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{tech.description}</DialogContentText>
      </DialogContent>
      <ActionGridStyled item active={parseStyledBoolean(isAdmin)}>
        <IconButton onClick={() => {}}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={remove}>
          <DeleteForeverIcon color="primary" />
        </IconButton>
      </ActionGridStyled>
    </GridContainerStyled>
  );
};

export default TechnologyDetails;
