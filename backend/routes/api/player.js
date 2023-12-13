const express = require("express");
let router = express.Router();
const validatePlayer = require("../../middlewares/validateplayer");
const { Player } = require("../../models/player");
//get Players
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let Players = await Player.find().skip(skipRecords).limit(perPage);
  return res.send(Players);
});
//get single Players
router.get("/:id", async (req, res) => {
  try {
    let Players= await Player.findById(req.params.id);
    if (!Player)
      return res.status(400).send("Player With given ID is not present"); //when id is not present id db
    return res.send(Players); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", validatePlayer, async (req, res) => {
  let Players = await Player.findById(req.params.id);
  Player.name = req.body.name;
  Player.price = req.body.price;
  await Player.save();
  return res.send(Players);
});
//update a record
router.delete("/:id", async (req, res) => {
  let Players = await Player.findByIdAndDelete(req.params.id);
  return res.send(Players);
});
//Insert a record
// Insert a record
router.post("/", validatePlayer, async (req, res) => {
  let newPlayer = new Player();
  newPlayer.name = req.body.name;
  newPlayer.clubname = req.body.clubname;
  newPlayer.salary = req.body.salary;
  await newPlayer.save();
  return res.send(newPlayer);
});

module.exports = router;
