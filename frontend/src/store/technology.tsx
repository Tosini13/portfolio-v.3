import React from "react";
import axios from "axios";

import { decorate, action, observable } from "mobx";
import { Id } from "../models/types";

const apiUrl = "http://localhost:1300/api";

type TechnologyType = {
  _id: Id;
  name: string;
  description?: string;
  logo?: any;
};

type TechnologyCreationType = Omit<Technology, "id">;

export class Technology {
  id: Id;
  name: string;
  description?: string;
  logo?: any;

  constructor({ _id, name, description, logo }: TechnologyType) {
    this.id = _id;
    this.name = name;
    this.description = description;
    this.logo = logo;
  }
}

decorate(Technology, {
  name: observable,
  description: observable,
});

class TechnologiesStore {
  technologies: Technology[] = [];

  fetch = async () => {
    const data = await axios.get(`${apiUrl}/technologies`);
    const technology = data.data;
    console.log(technology);
    this.technologies = technology.map(
      (tech: any) =>
        new Technology({
          _id: tech._id,
          name: tech.name,
          description: tech.description,
          logo: tech.logo,
        })
    );
  };

  add = async (technology: TechnologyCreationType) => {
    console.log(technology);
    let formData = new FormData();
    formData.append("name", technology.name);
    // formData.append("desc", technology.description);
    formData.append("logo", technology.logo);
    // const data = await axios.post<TechnologyType>(`${apiUrl}/technologies`, {
    //   name: technology.name,
    //   description: technology.description,
    //   logo: technology.logo,
    // });
    console.log(formData);
    axios
      .post<TechnologyType>(`${apiUrl}/technologies`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    // this.technologies = [
    //   ...this.technologies,
    //   new Technology({
    //     _id: data.data._id,
    //     name: data.data.name,
    //     description: data.data.description,
    //     logo: data.data.logo,
    //   }),
    // ];
  };

  update = async (technology: Technology) => {
    const data = await axios.put<TechnologyType>(
      `${apiUrl}/technologies/${technology.id}`,
      {
        name: technology.name,
        description: technology.description,
      }
    );
    this.technologies = this.technologies.map((tech) =>
      tech.id === data.data._id
        ? new Technology({
            _id: data.data._id,
            name: data.data.name,
            description: data.data.description,
          })
        : tech
    );
  };

  remove = async (techId: Id) => {
    try {
      const data = await axios.delete<TechnologyType>(
        `${apiUrl}/technologies/${techId}`
      );
      this.technologies = this.technologies.filter(
        (tech) => tech.id !== data.data._id
      );
    } catch (err) {
      console.log(err);
    }
  };
}

decorate(TechnologiesStore, {
  technologies: observable,
  fetch: observable,
  add: action,
  update: action,
  remove: action,
});

const storeTechnologies = new TechnologiesStore();
export const StoreTechnologiesContext = React.createContext(storeTechnologies);
export const StoreTechnologiesProvider: React.FC<{}> = ({ children }) => {
  return (
    <StoreTechnologiesContext.Provider value={storeTechnologies}>
      {children}
    </StoreTechnologiesContext.Provider>
  );
};
