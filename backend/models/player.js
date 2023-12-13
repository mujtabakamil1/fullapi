var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var playerSchema = mongoose.Schema({
  name: String,
  clubname : String,
  salary:Number
});
var Player = mongoose.model("player", playerSchema);

function validateplayer(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    clubname: Joi.string().min(3).max(10).required(),
    salary: Joi.number().min(0).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Player = Player;
module.exports.validate = validateplayer;
