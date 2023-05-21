const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const spotSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: [true, "Description is required."],
    },

    adress: {
      type: String,
      required: [true, "Adress is required."],
    },

    rating: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
      enum: ["London", "Rome", "Barcelona"],
      default: "London",
    },
  }
  //   {
  //     // this second object adds extra properties: `createdAt` and `updatedAt`
  //     timestamps: true,
  //   }
);

const Spot = model("Spot", spotSchema);

module.exports = Spot;
