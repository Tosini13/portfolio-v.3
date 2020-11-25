const express = require("express");
const multer = require("multer");
const router = express.Router();
const technologies = require("../controllers/technologies");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, technologies.uploadsTechnologiesURL);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

router.get("/technologies", technologies.getTechnologies);
router.post(
  "/technologies",
  upload.single("logo"),
  technologies.postTechnology
);
router.put(
  "/technologies/:id",
  upload.single("logo"),
  technologies.putTechnology
);
router.delete("/technologies/:id", technologies.deleteTechnology);

module.exports = router;
