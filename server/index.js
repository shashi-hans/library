const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const createError = require("http-errors");

// create express app
const app = express();

// Required Routes
const bookRoute = require("./routes/api/routeBooks");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));
// cors
app.use(cors({ origin: true, credentials: true }));

// use Routes
app.use("/api/books", bookRoute);

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server running on port" + port);
});
