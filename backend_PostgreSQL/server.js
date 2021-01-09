const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

// create express app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000"
};

// connecting frontend to backend
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// Setup server port
const port = process.env.PORT || 5000;

// Require employee routes
const routes = require('./app/routes/');

// using as middleware
app.use('/', routes);


// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});