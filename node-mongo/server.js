const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// require("dotenv").config();
// //for login
// const cors = require('cors');
const jwt = require('jsonwebtoken');
// const utils = require

require("./app/models/exercise.model.js");


app.use(bodyParser.json());




 

// require("./app/models/exercise.model.js");

//Configure the database
// require("dotenv").config();
const mongoose = require("mongoose");

//Connecting to the database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

require("./app/routes/exercise.router.js")(app);
//Create a Server
const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

// require("./app/")
