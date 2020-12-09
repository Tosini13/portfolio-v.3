var fs = require("fs");
var path = require("path");
const multer = require("multer");

const uploadsTechnologiesURL = "uploads/technologies/";

const Technology = require("../models/technology");

const getTechnologies = (req, res) => {
  Technology.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      let techonologies = [];
      items.forEach((element) => {
        let file = undefined;
        if (element.logo.name) {
          file = fs.readFileSync(
            path.join(
              path.dirname(require.main.filename) +
                "/" +
                uploadsTechnologiesURL +
                element.logo.name
            )
          );
        }
        techonologies.push({
          logo: file
            ? `data:image/${element.logo.contentType};base64, ${file.toString(
                "base64"
              )}`
            : undefined,
          contentType: element.logo.contentType,
          name: element.name,
          description: element.description,
          _id: element._id,
        });
      });
      res.send(techonologies);
    }
  });
};

const postTechnology = (req, res, next) => {
  let techData = {
    name: req.body.name,
    description: req.body.description,
  };
  if (req.file && req.body.logo) {
    techData = {
      ...techData,
      logo: {
        name: req.file.filename,
        contentType: "image/png",
      },
    };
  }
  if (!req.file && !req.body.logo) {
    techData = {
      ...techData,
      logo: undefined,
    };
  }
  Technology.create(techData, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(techData);
    }
  });
};

const putTechnology = (req, res, next) => {
  let techData = {
    name: req.body.name,
    description: req.body.description,
  };
  if (req.file && req.body.logo) {
    techData = {
      ...techData,
      logo: {
        name: req.file.filename,
        contentType: "image/png",
      },
    };
  }
  if (!req.file && !req.body.logo) {
    techData = {
      ...techData,
      logo: undefined,
    };
  }
  Technology.findByIdAndUpdate({ _id: req.params.id }, techData)
    .then((tech) => {
      if (!req.file && !req.body.logo) {
        fs.unlink(
          path.join(
            path.dirname(require.main.filename) +
              "/" +
              uploadsTechnologiesURL +
              tech.logo.name
          ),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
      Technology.findOne({ _id: req.params.id })
        .then((tech) => res.send(tech))
        .catch(next);
    })
    .catch(next);
};

const deleteTechnology = (req, res, next) => {
  Technology.findByIdAndRemove({ _id: req.params.id })
    .then((tech) => {
      if (tech.logo.name) {
        fs.unlink(
          path.join(
            path.dirname(require.main.filename) +
              "/" +
              uploadsTechnologiesURL +
              tech.logo.name
          ),
          (err) => {
            if (err) console.log(err);
            res.send(tech);
          }
        );
      } else {
        res.send(tech);
      }
    })
    .catch(next);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsTechnologiesURL);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

module.exports = {
  getTechnologies,
  postTechnology,
  putTechnology,
  deleteTechnology,
  upload,
};
