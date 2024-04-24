// invoiceRouter.js

const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice"); // Assuming you have a model for Invoice

// MongoDB connection setup
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const invoice = new Invoice({
    // Assuming req.body contains necessary fields for invoice creation
  });

  try {
    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
