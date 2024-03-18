const mongoose = require("mongoose");

const connectDB = (uri) => {
  return mongoose.connect(uri, {
    useNewurlParser: true,
    useUnnifiedTopology: true,
  });
};

module.exports = connectDB;
