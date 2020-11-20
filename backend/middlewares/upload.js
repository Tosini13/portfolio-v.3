const util = require("util");
const multer = require("multer");
const uuid = require("uuid");
const GridFsStorage = require("multer-gridfs-storage");

const storage1 = new GridFsStorage({
  url: "mongodb://localhost/portfolio",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `portfolio-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `portfolio-${file.originalname}`,
    };
  },
});

const DIR = "./public";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, res, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + filename);
  },
});

const uploadFile = multer({
  storage: storage,
  fileFilter: (req, res, cb) => {
    console.log("multer");
    console.log(req);
    const match = ["image/png", "image/jpg", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      cb(null, true);
      return cb(new Error("Only .png, .jpg and .jpeg are allowed"));
    } else {
      cb(null, true);
    }
  },
});

module.exports = uploadFile;
