const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StopsSchema = new Schema({
  name: String,
  type: String,
  coordinates: {
    lat: String,
    lng: String,
  },
  imageUrl: String,
});
const Stops = mongoose.model("Stops", StopsSchema);

module.exports = Stops;
