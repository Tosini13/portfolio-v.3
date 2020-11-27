const mongoose = require("mongoose");
const Technology = require("./technology");
const Schema = mongoose.Schema;

const Links = {
  github: {
    type: String,
    required: false,
  },
  www: {
    type: String,
    required: false,
  },
};

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
  },
  description: {
    type: String,
    required: false,
  },
  view: {
    name: String,
    contentType: String,
  },
  technologies: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  links: {
    type: Links,
    default: {},
    required: false,
  },
});

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
