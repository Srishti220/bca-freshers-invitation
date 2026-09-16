const express = require("express");
const RSVP = require("../models/RSVP");

const router = express.Router();

// Create a new RSVP
router.post("/", async (req, res) => {
  try {
    const { name, department, attendance, guests } = req.body;

    if (!name || !attendance) {
      return res.status(400).json({
        message: "Name and attendance are required.",
      });
    }

    const newRSVP = new RSVP({
      name,
      department,
      attendance,
      guests,
    });

    const savedRSVP = await newRSVP.save();

    res.status(201).json({
      message: "RSVP submitted successfully 🎉",
      rsvp: savedRSVP,
    });
  } catch (error) {
    console.error("RSVP error:", error);

    res.status(500).json({
      message: "Failed to submit RSVP.",
      error: error.message,
    });
  }
});

// Get all RSVPs
router.get("/", async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });

    res.json(rsvps);
  } catch (error) {
    console.error("Fetch RSVP error:", error);

    res.status(500).json({
      message: "Failed to fetch RSVPs.",
      error: error.message,
    });
  }
});

module.exports = router;