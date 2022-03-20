require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const cardRoutes = require("./routes/card");

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", cardRoutes);

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log("Mongoose connected with " + err);
  }
);

app.listen(process.env.PORT, (err) => {
  console.log(`Server started with ${err}`);
});
