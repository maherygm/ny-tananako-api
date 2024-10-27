const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  order_id: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: String,
  payment_date: Date,
});

// Export the model
const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
