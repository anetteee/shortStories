const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
    },
    quote: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { collection: "quotes" }
);

const Quote = mongoose.model("quotes", QuoteSchema);

module.exports = Quote;
