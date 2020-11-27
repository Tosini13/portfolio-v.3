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
import { Project, StoreProjectsContext, Links } from "../../../store/project";

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

  const [name, setName] = useState<string>(project ? project.name : "");
  const [description, setDescription] = useState<string>(
    project?.description ? project.description : ""
  );
  const [image, setImage] = useState<any>(project ? project.view : undefined);
  const [links, setLinks] = useState<Links | undefined>(undefined);

  const { handleSubmit, register, errors } = useForm();
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

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks({
      ...links,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setName(project ? project.name : "");
    setDescription(project?.description ? project.description : "");
  }, [project, open]);

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
            <TextField
              label="GitHub"
              value={links?.github}
              onChange={handleChangeLinks}
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
              value={links?.www}
              onChange={handleChangeLinks}
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
              ADD
            </Button>
          </GridItemStyled>
        </GridContainerStyled>
      </form>
    </Dialog>
  );
};

export default TechnologyForm;
