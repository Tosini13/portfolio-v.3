const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechnolodySchema = new Schema({
  name: {
    type: String,
    required: [true, "Technology name is required"],
  },
  description: {
    type: String,
    required: false,
  },
  logo: {
    name: String,
    contentType: String,
    required: false,
  },
});

const Technology = mongoose.model("technology", TechnolodySchema);

module.exports = Technology;
