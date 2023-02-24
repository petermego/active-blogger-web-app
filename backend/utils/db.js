const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  return await mongoose
    .connect(`${process.env.DB_URI}`)
    .then(() => {
      console.log("connection established successfuly");
    })
    .catch((err) => {
      console.log(`connection failed ${err}`);
    });
};

module.exports = connectDB;
