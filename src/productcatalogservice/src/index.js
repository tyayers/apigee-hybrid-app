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

const fs = require("fs");
const axios = require('axios').default;
const https = require('https');

const dotenv = require('dotenv');
dotenv.config();

// defining the Express app
const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// defining an endpoint to return all ads
app.get('/products', (req, res) => {

  var data = JSON.parse(fs.readFileSync("data/products.json"));  
  res.send(data);
});

app.get('/products/:productid', (req, res) => {
  var productid = req.params.productid;

  var data = JSON.parse(fs.readFileSync("data/products.json"));

  var foundItem = false;
  for (const [key, value] of Object.entries(data)) {
    for(const index in data[key]) {
      var item = data[key][index];

      if(item.id == productid) {
        res.send(item);
        foundItem = true;
        break;
      }
    }

    if (foundItem) break;
  }

  if (!foundItem) res.status(404).send("Product not found");
});

app.get('/search-products/:input', (req, res) => {
  var input = req.params.input;
  //errors.report('The search-products API was called, but is not yet implemented!');
  axios("http://productsearchservice/search-products/" + input).then((response) => {
    res.send(response.data);
  })
  .catch((error) => {
    console.log(error);
    errors.report('Error calling the productsearchservice: ' + error.message);
    res.status(500).send("Error calling productsearchservice: " + error.message);
  });
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