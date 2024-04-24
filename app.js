// app.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// MongoDB connection setup
mongoose.connect("mongodb://localhost:27017/invoice_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
const invoiceRouter = require("./server/invoice/invoiceRouter");
const analysisRouter = require("./server/analysis/analysisRouter");

app.use("/invoices", invoiceRouter);
app.use("/analysis", analysisRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
