// models/Invoice.js

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    // Define schema fields for invoice
    invoiceNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    // Add more fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
