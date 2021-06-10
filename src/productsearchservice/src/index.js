// importing the dependencies
const tracer = require('@google-cloud/trace-agent').start({
  projectId: 'bruno-1407a',
  keyFilename: 'key.json',
});
const monitoring = require('@google-cloud/monitoring');
// Imports the Google Cloud client library
const {ErrorReporting} = require('@google-cloud/error-reporting');
// Instantiates a client
const errors = new ErrorReporting({
  projectId: 'bruno-1407a',
  keyFilename: 'key.json',
  reportMode: 'always'
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require("fs");

const dotenv = require('dotenv');
dotenv.config();

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.get('/search-products/:input', (req, res) => {
  errors.report('The search-products API was called, but is not yet implemented!');
  res.status(500).send({message: "Not yet implemented."});
});

app.get('/', (req, res) => {
  res.send("Service is healthy.");
});

app.get('/health', (req, res) => {
  res.send("Service is healthy.");
});

// starting the server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});