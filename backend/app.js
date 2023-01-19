const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");

const errorUndefiendController = require('./controllers/error-404');
const signup = require('./routes/signup');
const signin = require('./routes/login');
const { isAuth } = require("./middleware/isAuth");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Origin", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(cors());
app.get('/auth', isAuth);
app.use(signup);
app.use(signin);
app.use(errorUndefiendController.getUndefiend);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is run in port: ${port}`);
});
