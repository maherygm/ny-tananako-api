const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  status: String,
  total_price: Number,
  session_id: String,
  user_id: mongoose.Schema.Types.ObjectId,
  user_mail: String,
  payment_id: String,
  event_types: String,
  date_event: Date,
});

// Export the model
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
