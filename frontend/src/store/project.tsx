import { Id } from "../models/types";
import { Technology } from "./technology";

type ProjectType = {
  _id: Id;
  name: string;
  description?: string;
  view?: any;
};

// export class Project {
//   id: Id;
//   name: string;
//   description?: string;
//   view?: any;

//   constructor({ _id, name, description, view }: ProjectType) {
//     this.id = _id;
//     this.name = name;
//     this.description = description;
//     this.view = view;
//   }
// }

export class Project extends Technology {}
