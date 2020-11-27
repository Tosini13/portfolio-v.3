const express = require("express");
const router = express.Router();
const technologies = require("../controllers/technologies");
const projects = require("../controllers/projects");

//#region PROJECTS
router.get("/projects", projects.getProjects);
router.post("/projects", projects.upload.single("view"), projects.postProject);

router.delete("/projects/:id", projects.deleteProject);
//#endregion PROJECTS

//#region TECHNOLOGIES
router.get("/technologies", technologies.getTechnologies);
router.post(
  "/technologies",
  technologies.upload.single("logo"),
  technologies.postTechnology
);
router.put(
  "/technologies/:id",
  technologies.upload.single("logo"),
  technologies.putTechnology
);
router.delete("/technologies/:id", technologies.deleteTechnology);
//#endregion TECHNOLOGIES

module.exports = router;
