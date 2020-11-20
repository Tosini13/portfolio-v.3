import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import styled from "styled-components";
import AddLogo from "../../global/AddLogo";
import {
  StoreTechnologiesContext,
  Technology,
} from "../../../store/technology";

const GridContainerStyled = styled(Grid)`
  padding: 10px;
`;

const GridItemStyled = styled(Grid)`
  margin-bottom: 10px;
`;

export interface TechnologyFormProps {
  handleClose: () => void;
  open: boolean;
  technology?: Technology;
}

const TechnologyForm: React.FC<TechnologyFormProps> = ({
  handleClose,
  open,
  technology,
}) => {
  const technologiesStore = useContext(StoreTechnologiesContext);
  const { add, update } = technologiesStore;

  const [image, setImage] = useState<any>();
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values: any) => {
    if (technology) {
      update({
        id: technology.id,
        name: values.name,
        description: values.description,
      });
    } else {
      add({ name: values.name, description: values.description, logo: image });
    }
    handleClose();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const [name, setName] = useState<string>(technology ? technology.name : "");
  const [description, setDescription] = useState<string>(
    technology?.description ? technology.description : ""
  );

  useEffect(() => {
    setName(technology ? technology.name : "");
    setDescription(technology?.description ? technology.description : "");
  }, [technology, open]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>Add Technology</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridContainerStyled
          container
          direction="column"
          alignItems="center"
          justify="space-evenly"
        >
          <GridItemStyled item>
            <AddLogo image={image} setImage={setImage} />
          </GridItemStyled>
          <GridItemStyled item>
            <TextField
              label="Name"
              value={name}
              onChange={handleChangeName}
              inputProps={{
                name: "name",
                ref: register({
                  required: "Required",
                  maxLength: 255,
                  minLength: 2,
                }),
              }}
              helperText={errors.name && "Title must have at least 2 signs!"}
              error={Boolean(errors.name)}
            />
          </GridItemStyled>
          <GridItemStyled item>
            <TextField
              label="Desription"
              value={description}
              onChange={handleChangeDescription}
              multiline
              inputProps={{
                name: "description",
                ref: register({
                  maxLength: 255,
                }),
              }}
            />
          </GridItemStyled>
          <GridItemStyled item>
            <Button variant="contained" color="primary" type="submit">
              ADD
            </Button>
          </GridItemStyled>
        </GridContainerStyled>
      </form>
    </Dialog>
  );
};

export default TechnologyForm;
