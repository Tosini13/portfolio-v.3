const express = require("express");
const router = express.Router();
const technologies = require("../controllers/technologies");
const image = require("../controllers/upload");
const uploadFile = require("../middlewares/upload");

const multer = require("multer");

router.get("/technologies", technologies.getTechnologies);
router.post(
  "/technologies",
  uploadFile.single("logo"),
  technologies.postTechnology
);
router.put("/technologies/:id", technologies.putTechnology);
router.delete("/technologies/:id", technologies.deleteTechnology);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage }).single("upload");

router.post("/upload", upload, (req, res) => {
  console.log(req.file);
  // upload(req, res, (err) => {
  //   console.log(req.file);
  //   if (err) {
  //     console.log(err);
  //     return 0;
  //   }
  //   console.log(req);
  // });
  // res.send();
  res.send();
});

// router.post("technologies/image", image.uploadFile);

module.exports = router;
