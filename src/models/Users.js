const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: String,
  password: String,
  role: String,
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
