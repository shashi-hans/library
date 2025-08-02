const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const createError = require("http-errors");
const bookRoute = require("./routes/routeBooks");
const app = express();

const isProduction = process.env.NODE_ENV === 'production';
console.log("environment ==========",process.env.NODE_ENV)
console.log("isProduction ==========",isProduction)

const allowedOrigin = isProduction
  ? 'https://library-mern-crud-app.netlify.app'
  : true; // allows localhost in dev

app.use(cors({ 
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true }));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));

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
