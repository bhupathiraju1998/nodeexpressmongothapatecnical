require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");

const products_routes = require("./routes/products");

app.get("/", (req, res) => {
  res.send("Hi Hellow world");
});

app.use("/api/products", products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGOD_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
