const express = require("express");
const router = require("./routes/api.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(3000);
