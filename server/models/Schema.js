// models/Invoice.js

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  tax: { type: Number, required: true },
  dateTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
