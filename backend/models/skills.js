const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: {
    type: String,
    required: [true, "Skill name is required"],
  },
  description: {
    type: String,
    required: false,
  },
});

const Skill = mongoose.model("skill", SkillSchema);

module.exports = Skill;
