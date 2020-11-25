const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
