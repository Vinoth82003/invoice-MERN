// models/Analysis.js

const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    // Define schema fields for analysis
    type: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    // Add more fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);
