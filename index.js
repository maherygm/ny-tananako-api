//importation
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

//declaration variable
const PORT = 4000;
const db =
  "mongodb+srv://maheryrak1234:rakotomalala1301@cluster0.6domolz.mongodb.net/ny_tananako";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

//lancement du serveur
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);

  //connection a la bd
  mongoose
    .connect(db)
    .then(() => console.log("Successfully connected to the database"))
    .catch((err) => console.error(err));
});
