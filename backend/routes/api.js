const express = require("express");
const router = express.Router();
const technologies = require("../controllers/technologies");
const projects = require("../controllers/projects");

//#region PROJECTS
router.get("/projects", projects.getProjects);
router.post("/projects", projects.upload.single("file"), projects.postProject);
router.put(
  "/projects/:id",
  projects.upload.single("file"),
  projects.putProject
);
router.delete("/projects/:id", projects.deleteProject);
//#endregion PROJECTS

//#region TECHNOLOGIES
router.get("/technologies", technologies.getTechnologies);
router.post(
  "/technologies",
  technologies.upload.single("file"),
  technologies.postTechnology
);
router.put(
  "/technologies/:id",
  technologies.upload.single("file"),
  technologies.putTechnology
);
router.delete("/technologies/:id", technologies.deleteTechnology);
//#endregion TECHNOLOGIES

module.exports = router;
