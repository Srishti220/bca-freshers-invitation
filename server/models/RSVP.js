const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      default: "BCA",
      trim: true,
    },

    attendance: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    guests: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RSVP", rsvpSchema);