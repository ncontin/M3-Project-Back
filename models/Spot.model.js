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

    address: {
      type: String,
      required: [true, "Address is required."],
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

    imageUrl: {
      type: String,
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }
  //   {
  //     // this second object adds extra properties: `createdAt` and `updatedAt`
  //     timestamps: true,
  //   }
);

const Spot = model("Spot", spotSchema);

module.exports = Spot;
