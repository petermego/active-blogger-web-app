const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Origin", "Content-Type, Authorization");
  next();
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is run in port: ${port}`);
});
