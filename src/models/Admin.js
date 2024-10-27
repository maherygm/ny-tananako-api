const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  mdp: String,
});

// Export the model
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
