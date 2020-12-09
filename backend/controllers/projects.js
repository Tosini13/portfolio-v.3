var fs = require("fs");
var path = require("path");
const multer = require("multer");

const uploadsProjectsURL = "uploads/projects/";

const Project = require("../models/projects");

const getProjects = (req, res) => {
  Project.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      let projects = [];
      items.forEach((element) => {
        let file = undefined;
        if (element.view.name) {
          file = fs.readFileSync(
            path.join(
              path.dirname(require.main.filename) +
                "/" +
                uploadsProjectsURL +
                element.view.name
            )
          );
        }
        projects.push({
          view: file
            ? `data:image/${element.view.contentType};base64, ${file.toString(
                "base64"
              )}`
            : undefined,
          contentType: element.view.contentType,
          name: element.name,
          description: element.description,
          techonologies: element.techonologies,
          links: element.links,
          _id: element._id,
        });
      });
      res.send(projects);
    }
  });
};

const postProject = (req, res, next) => {
  let projectData = {
    name: req.body.name,
    description: req.body.description,
    view: {
      name: req.file.filename,
      contentType: "image/png",
    },
    techonologies: req.body.techonologies,
    links: JSON.parse(req.body.links),
  };
  Project.create(projectData, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(projectData);
    }
  });
};

const putProject = (req, res, next) => {
  let projectData = {
    name: req.body.name,
    description: req.body.description,
    techonologies: req.body.techonologies,
    links: JSON.parse(req.body.links),
  };
  if (req.file && req.body.view) {
    projectData = {
      ...projectData,
      view: {
        name: req.file.filename,
        contentType: "image/png",
      },
    };
  }
  if (!req.file && !req.body.view) {
    projectData = {
      ...projectData,
      view: undefined,
    };
  }
  Project.findByIdAndUpdate({ _id: req.params.id }, projectData)
    .then((project) => {
      if (!req.file && !req.body.view) {
        fs.unlink(
          path.join(
            path.dirname(require.main.filename) +
              "/" +
              uploadsProjectsURL +
              project.view.name
          ),
          (err) => {
            if (err) console.log(err);
          }
        );
        Project.findOne({ _id: req.params.id })
          .then((tech) => res.send(tech))
          .catch(next);
      }
    })
    .catch(next);
};

const deleteProject = (req, res, next) => {
  Project.findByIdAndRemove({ _id: req.params.id })
    .then((project) => {
      if (project.view.name) {
        fs.unlink(
          path.join(
            path.dirname(require.main.filename) +
              "/" +
              uploadsProjectsURL +
              project.view.name
          ),
          (err) => {
            if (err) console.log(err);
            res.send(project);
          }
        );
      } else {
        res.send(project);
      }
    })
    .catch(next);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsProjectsURL);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

module.exports = {
  getProjects,
  postProject,
  putProject,
  deleteProject,
  upload,
};
