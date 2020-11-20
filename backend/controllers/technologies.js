const mongoose = require("mongoose");
const Technology = require("../models/technology");

const getTechnologies = (req, res) => {
  Technology.find({}).then((techs) => {
    res.send(techs);
  });
};

const postTechnology = (req, res, next) => {
  console.log("post");
  const url = req.protocol + "://" + req.get("host");
  console.log(url + "/public/" + req.body.logo.name);
  const tech = new Technology({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.name,
    logo: url + "/public/" + req.body.logo.name,
  });

  tech
    .save()
    .then((tech) => {
      res.send(tech);
    })
    .catch(next);
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
