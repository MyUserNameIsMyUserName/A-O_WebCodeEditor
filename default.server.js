// Express
const open = require('open');
const dotenv = require('dotenv').config();
const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const PROTOCOL = process.env.PROTOCOL;
const ORIGIN = process.env.ORIGIN;
const PORT = process.env.DEFAULT_PORT;

const STATIC = path.resolve(__dirname, "PUBLIC");
const INDEX = path.resolve(STATIC, "index.html");


const app = express();
app.use(bodyParser.json());

// compress all responses
app.use(compression());
// Static content
app.use(express.static(STATIC));

// All GET request handled by INDEX file
app.get("*", function (req, res) {
    res.sendFile(INDEX);
});

// Start server
app.listen(PORT, function () {
    console.log("Server up and running on "+ PROTOCOL + "://" + ORIGIN + ":" + PORT + "/");
    open(PROTOCOL + "://" + ORIGIN + ":" + PORT + "/");
});