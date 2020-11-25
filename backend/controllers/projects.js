var fs = require("fs");
var path = require("path");

const uploadsProjectsURL = "uploads/projects/";

const Project = require("../models/projects");

const postProject = (req, res, next) => {
  const project = {
    name: req.body.name,
    description: req.body.description,
    view: {
      name: req.file.filename,
      contentType: "image/png",
    },
  };
  Project.create(project, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(tech);
    }
  });
};

module.exports = {
  postProject,
  uploadsProjectsURL,
};
