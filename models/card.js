const { Schema, model } = require("mongoose");

const CardSchema = Schema(
  {
    cardNumber: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    CVV: Number,
    amount: Number,
  },
  { timestamps: true }
);

module.exports = model("Card", CardSchema);
