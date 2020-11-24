var fs = require("fs");
var path = require("path");

const Technology = require("../models/technology");

const getTechnologies = (req, res) => {
  Technology.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      let techonologies = [];
      items.forEach((element) => {
        const file = fs.readFileSync(
          path.join(
            path.dirname(require.main.filename) +
              "/uploads/" +
              element.logo.name
          )
        );
        techonologies.push({
          logo: `data:image/${element.logo.contentType};base64, ${file.toString(
            "base64"
          )}`,
          contentType: element.logo.contentType,
          name: element.name,
          _id: element._id,
        });
      });
      res.send(techonologies);
    }
  });
};

const postTechnology = (req, res, next) => {
  const tech = {
    name: req.body.name,
    description: req.body.description,
    logo: {
      name: req.file.filename,
      contentType: "image/png",
    },
  };
  Technology.create(tech, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("/");
    }
  });
};

const putTechnology = (req, res, next) => {
  Technology.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((tech) => {
      Technology.findOne({ _id: req.params.id })
        .then((tech) => res.send(tech))
        .catch(next);
    })
    .catch(next);
};

const deleteTechnology = (req, res, next) => {
  Technology.findByIdAndRemove({ _id: req.params.id })
    .then((tech) => res.send(tech))
    .catch(next);
};

module.exports = {
  getTechnologies,
  postTechnology,
  putTechnology,
  deleteTechnology,
};
