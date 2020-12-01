import React, { createContext } from "react";

import { action, decorate, observable } from "mobx";
import { Id } from "../models/types";
import axios from "axios";

const apiUrl = "http://localhost:1300/api";

export type Links = {
  github?: string;
  www?: string;
};

type ProjectType = {
  _id: Id;
  name: string;
  description?: string;
  view?: any;
  technologies?: string[];
  links?: Links;
};

type ProjectCreationType = Omit<ProjectType, "_id">;
export type ProjectFormType = Omit<ProjectType, "_id" | "view" | "links"> & {
  github?: string;
  www?: string;
};

export class Project {
  id: Id;
  name: string;
  description?: string;
  view?: any;
  technologies?: string[];
  links?: Links;

  constructor({
    _id,
    name,
    description,
    view,
    technologies,
    links,
  }: ProjectType) {
    this.id = _id;
    this.name = name;
    this.description = description;
    this.view = view;
    this.technologies = technologies;
    this.links = links;
  }
}

decorate(Project, {
  name: observable,
  description: observable,
  view: observable,
  technologies: observable,
  links: observable,
});

class ProjectStore {
  projects: Project[] = [];

  fetch = async () => {
    const data = await axios.get(`${apiUrl}/projects`);
    const projects = data.data;
    console.log(projects);
    this.projects = projects.map(
      (project: any) =>
        new Project({
          _id: project._id,
          name: project.name,
          description: project.description,
          view: project.view,
          technologies: project.technologies,
          links: project.links,
        })
    );
  };

  add = async (project: ProjectCreationType) => {
    let formData = new FormData();
    formData.append("name", project.name);
    if (project.description) {
      formData.append("description", project.description);
    }
    if (project.technologies) {
      formData.append("technologies", JSON.stringify(project.technologies));
    }
    if (project.links) {
      formData.append("links", JSON.stringify(project.links));
    }
    formData.append("view", project.view);
    axios
      .post<ProjectType>(`${apiUrl}/projects`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(
        (res) =>
          (this.projects = [
            ...this.projects,
            new Project({
              _id: res.data._id,
              name: res.data.name,
              description: res.data.description,
              view: res.data.view,
              technologies: res.data.technologies,
              links: res.data.links,
            }),
          ])
      )
      .catch((err) => console.log(err));
  };

  update = async (project: Project) => {
    console.log(project);
    let formData = new FormData();
    formData.append("name", project.name);
    if (project.description) {
      formData.append("description", project.description);
    }
    if (project.technologies) {
      console.log(project.technologies.toString());
      formData.append("technologies", project.technologies.toString());
    }
    if (project.links) {
      console.log(project.links.toString());
      formData.append("links", project.links.toString());
    }
    formData.append("view", project.view);
    const data = await axios.put<ProjectType>(
      `${apiUrl}/projects/${project.id}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    this.projects = this.projects.map((project) =>
      project.id === data.data._id
        ? new Project({
            _id: data.data._id,
            name: data.data.name,
            description: data.data.description,
            technologies: data.data.technologies,
            links: data.data.links,
          })
        : project
    );
  };

  remove = async (projectId: Id) => {
    try {
      const data = await axios.delete<ProjectType>(
        `${apiUrl}/projects/${projectId}`
      );
      this.projects = this.projects.filter(
        (project) => project.id !== data.data._id
      );
    } catch (err) {
      console.log(err);
    }
  };
}

decorate(ProjectStore, {
  projects: observable,
  fetch: observable,
  add: action,
  update: action,
  remove: action,
});

const storeProjects = new ProjectStore();
export const StoreProjectsContext = createContext(storeProjects);
export const StoreProjectsProvider: React.FC<{}> = ({ children }) => {
  return (
    <StoreProjectsContext.Provider value={storeProjects}>
      {children}
    </StoreProjectsContext.Provider>
  );
};
