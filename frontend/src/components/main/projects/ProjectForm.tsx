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
  Project,
  StoreProjectsContext,
  ProjectFormType,
} from "../../../store/project";

const GridContainerStyled = styled(Grid)`
  padding: 10px 30px;
`;

const GridItemStyled = styled(Grid)`
  margin-bottom: 10px;
`;

export interface TechnologyFormProps {
  handleClose: () => void;
  open: boolean;
  project?: Project;
}

const TechnologyForm: React.FC<TechnologyFormProps> = ({
  handleClose,
  open,
  project,
}) => {
  const projectsStore = useContext(StoreProjectsContext);
  const { add, update } = projectsStore;

  const [image, setImage] = useState<any>(project ? project.view : undefined);

  const { handleSubmit, register, errors, reset } = useForm<ProjectFormType>();
  const onSubmit = (values: any) => {
    console.log(values);
    if (project) {
      update({
        id: project.id,
        name: values.name,
        description: values.description,
        links: {
          github: values.github,
          www: values.www,
        },
        view: image,
      });
    } else {
      add({
        name: values.name,
        description: values.description,
        links: {
          github: values.github,
          www: values.www,
        },
        view: image,
      });
    }
    handleClose();
  };

  useEffect(() => {
    reset({
      name: project?.name,
      description: project?.description,
      github: project?.links?.github,
      www: project?.links?.www,
    });
  }, [reset, project]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>Add Project</DialogTitle>
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
            <TextField
              label="GitHub"
              multiline
              inputProps={{
                name: "github",
                ref: register({
                  maxLength: 255,
                }),
              }}
            />
          </GridItemStyled>
          <GridItemStyled item>
            <TextField
              label="www"
              multiline
              inputProps={{
                name: "www",
                ref: register({
                  maxLength: 255,
                }),
              }}
            />
          </GridItemStyled>
          <GridItemStyled item>
            <Button variant="contained" color="primary" type="submit">
              {project ? "UPDATE" : "ADD"}
            </Button>
          </GridItemStyled>
        </GridContainerStyled>
      </form>
    </Dialog>
  );
};

export default TechnologyForm;
