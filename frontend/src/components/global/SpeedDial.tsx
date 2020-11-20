import React, { ReactNode } from "react";

import AddIcon from "@material-ui/icons/Add";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import styled from "styled-components";
import { parseStyledBoolean } from "../../models/global";

const SpeedDialStyled = styled(SpeedDial)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const AddStyled = styled(AddIcon)<{ blocked?: string }>`
  transition-property: transform;
  transition-duration: 0.3s;
  ${(props) =>
    props.blocked ? `transform: rotate(45deg)` : `transform: rotate(0deg)`}
`;

type SpeedDialComponentProps = {
  actions: {
    icon: ReactNode;
    name: string;
  }[];
  blocked?: boolean;
  unBlock?: () => void;
};

const SpeedDialComponent: React.FC<SpeedDialComponentProps> = ({
  actions,
  blocked = false,
  unBlock,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e: Object, reason: string) => {
    if (blocked && unBlock && reason === "focus") {
      unBlock();
      return true;
    }
    if ((blocked && reason === "mouseEnter") || reason === "focus") {
      return false;
    }
    setOpen(true);
  };

  return (
    <SpeedDialStyled
      ariaLabel="SpeedDial example"
      icon={<AddStyled blocked={parseStyledBoolean(open || blocked)} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={"down"}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDialStyled>
  );
};

export default SpeedDialComponent;
