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
  TechnologyFormType,
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

  const [image, setImage] = useState<any>(
    technology ? technology.logo : undefined
  );

  const { handleSubmit, register, errors, reset } = useForm<TechnologyFormType>(
    {
      defaultValues: {
        name: technology?.name,
        description: technology?.description,
      },
    }
  );

  useEffect(() => {
    reset({
      name: technology?.name,
      description: technology?.description,
    });
  }, [technology, reset]);

  const onSubmit = (values: any) => {
    if (technology) {
      update({
        id: technology.id,
        name: values.name,
        description: values.description,
        logo: image,
      });
    } else {
      add({ name: values.name, description: values.description, logo: image });
    }
    handleClose();
  };
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
              {technology ? "UPDATE" : "ADD"}
            </Button>
          </GridItemStyled>
        </GridContainerStyled>
      </form>
    </Dialog>
  );
};

export default TechnologyForm;
