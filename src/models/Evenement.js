const mongoose = require("mongoose");
const EvenementSchema = new mongoose.Schema({
  types: String,
  date_evenement: Date,
  date_fin: Date,
  prix: Number,
  validation: Boolean,
  note_evenement: String,
  client_id: mongoose.Schema.Types.ObjectId,
  stripe_event_id: String,
  lookup_key: String,
});

// Export the model
const Evenement = mongoose.model("Evenement", EvenementSchema);
module.exports = Evenement;
