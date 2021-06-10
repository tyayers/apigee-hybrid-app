const tracer = require('@google-cloud/trace-agent').start({
  projectId: 'bruno-1407a',
  keyFilename: 'key.json',
});

const express = require("express");
const axios = require('axios');
const history = require('connect-history-api-fallback-exclusions');
const dotenv = require('dotenv');
dotenv.config();

var app = express();
app.use(history({
    exclusions: [
        "/parameters/*"
    ]
}));

//app.use("/hipster", express.static('dist'));
app.use(express.static('public'));

app.get('/parameters/:name', (req, res) => {
    var name = req.params.name;
    console.log("parameter: " + name + "=" + process.env[name]);
    var result = {};
    result[name] = process.env[name];
    res.send(result);
});

app.get('/parameters', (req, res) => {
  console.log("get parameters");

  var result = 
  {
      parameters: {
        useTestData: true,
        platformName: "Google Cloud \n Apigee"
      }
  };

  if (process.env.useTestData) result.parameters["useTestData"] = process.env.useTestData.toLowerCase() == "true";
  if (process.env.baseUrl) result.parameters["baseUrl"] = process.env.baseUrl;
  if (process.env.platformName) result.parameters["platformName"] = process.env.platformName;
  if (process.env.productKey) result.parameters["productKey"] = process.env.productKey;
  res.send(result);
});

var server = app.listen("8080", function(){
    console.log("Server started at http://localhost:8080");
});