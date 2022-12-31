const express = require("express");
const router = require("./routes/api");
require("dotenv").config();

const { APP_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(APP_PORT);
