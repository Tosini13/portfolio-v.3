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
        const file = fs.readFileSync(
          path.join(
            path.dirname(require.main.filename) +
              "/" +
              uploadsProjectsURL +
              element.view.name
          )
        );
        projects.push({
          view: `data:image/${element.view.contentType};base64, ${file.toString(
            "base64"
          )}`,
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
  const project = {
    name: req.body.name,
    description: req.body.description,
    view: {
      name: req.file.filename,
      contentType: "image/png",
    },
    techonologies: req.body.techonologies,
    links: JSON.parse(req.body.links),
  };
  Project.create(project, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(project);
    }
  });
};

const putProject = (req, res, next) => {
  console.log(req.body.links);
  const projectData = {
    name: req.body.name,
    description: req.body.description,
    view: {
      name: req.file.filename,
      contentType: "image/png",
    },
    techonologies: req.body.techonologies,
    links: JSON.parse(req.body.links),
  };
  Project.findByIdAndUpdate({ _id: req.params.id }, projectData)
    .then((project) => {
      fs.unlink(
        path.join(
          path.dirname(require.main.filename) +
            "/" +
            uploadsProjectsURL +
            project.logo.name
        ),
        (err) => {
          if (err) console.log(err);
        }
      );
      Project.findOne({ _id: req.params.id })
        .then((tech) => res.send(tech))
        .catch(next);
    })
    .catch(next);
};

const deleteProject = (req, res, next) => {
  Project.findByIdAndRemove({ _id: req.params.id })
    .then((project) => {
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
