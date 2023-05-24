const Spot = require("../models/Spot.model");

const router = require("express").Router();

const uploader = require("../middleware/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post(
  "/",
  uploader.single("imageUrl"),
  isAuthenticated,
  async (req, res, next) => {
    const { title, description, address, rating, city } = req.body;
    const imageUrl = req.file.path;
    console.log(req.payload);
    try {
      const newSpot = await Spot.create({
        title,
        description,
        address,
        rating,
        city,
        imageUrl,
        user_id: req.payload.userId,
      });
      res.status(201).json(newSpot);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const allSpots = await Spot.find();
    res.status(200).json(allSpots);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:spotId", async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.spotId).populate("user_id");
    console.log(spot.user_id);
    res.status(200).json(spot);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const payload = req.body;

  try {
    const updateSpot = await Spot.findByIdAndUpdate(spotId, payload, {
      new: true,
    });
    res.status(200).json(updateSpot);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:spotId", async (req, res) => {
  try {
    await Spot.findByIdAndDelete(req.params.spotId);
    res.status(200).json({ message: "Spot successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
