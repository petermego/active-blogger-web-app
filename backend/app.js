const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./utils/db");

const dotenv = require('dotenv');
dotenv.config();

const errorUndefiendController = require('./controllers/error-404');
const signup = require('./routes/signup');
const signin = require('./routes/login');
const user = require('./routes/user');

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests at short time.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/upload", express.static("./uploads"));
app.use(apiLimiter);
app.use(signup);
app.use(signin);
app.use(user);
app.use(errorUndefiendController.getUndefiend);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is run in port: ${port}`);
});
