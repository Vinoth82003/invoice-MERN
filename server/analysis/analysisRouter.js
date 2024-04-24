// analysisRouter.js

const express = require("express");
const router = express.Router();
const Analysis = require("../models/Schema"); // Assuming you have a model for Analysis

// MongoDB connection setup
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes
router.get("/", async (req, res) => {
  try {
    const analysis = await Analysis.find();
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const analysis = new Analysis({
    // Assuming req.body contains necessary fields for analysis creation
  });

  try {
    const newAnalysis = await analysis.save();
    res.status(201).json(newAnalysis);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
