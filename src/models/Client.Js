const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  mdp: String,
});

// Export the model
const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
