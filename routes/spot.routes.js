const Spot = require("../models/Spot.model");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newSpot = await Spot.create(payload);
    res.status(201).json(newSpot);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allSpots = await Spot.find();
    res.status(200).json(allSpots);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
