const express = require("express");
require("dotenv").config();

const { SERVER_PORT } = process.env;

console.log(process.env);

const app = express();
