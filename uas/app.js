// import express
const express = require("express");
// import morgan
const morgan = require("morgan");
// import path
const path = require("path");
// import rfs dari rotating-file-stream
const rfs = require("rotating-file-stream");
// import router
const router = require("./routes/api.js");
// import db (config database)
const db = require("./config/database");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { APP_PORT } = process.env;

// membuat object express
const app = express();

// membuat rotating file stream dengan nama access.log
const accessLogStream = rfs.createStream("access.log", {
    size: "2M", // max size 2MB
    interval: "1d", // rotasi harian
    path: path.join(__dirname, "log"), // menyimpan path di direktori ini dan dengan nama log
    compress: "gzip", // mengcompress menjadi format .gzip
});

// menetapkan fungsi untuk skip status code yang kurang dari 200 dan yang lebih besar dari 300
const requestConsoleLogStream = (req, res) => {
    return res.statusCode < 200 || res.statusCode >= 300;
};

// menetapkan fungsi untuk skip status code yang kurang dari 400
const devConsoleLogStream = (req, res) => {
    return res.statusCode < 400;
};

// menggunakan middleware
app.use(express.json());

// menggunakan urlencoded untuk mengurai data menjadi bentuk JSON
app.use(express.urlencoded({ extended: true }));

// menggunakan morgan untuk melakukan log aplikasi
app.use(morgan("combined", { stream: accessLogStream }));

// menggunakan morgan untuk menampilkan console ke aplikasi jika terjadi request
app.use(morgan("dev", { skip: requestConsoleLogStream }));

// menggunakan morgan untuk menampilkan console ke aplikasi jika terjadi error
app.use(morgan("dev", { skip: devConsoleLogStream }));

// menggunakan routing (router)
app.use(router);

// melakukan sinkronisasi
db.sequelize
    // berfungsi untuk mendrop apabila sudah ada table dan me-resynchronize database // untuk development
    // .sync({ force: true })
    .sync()
    .then(() => {
        // console.log("Drop and re-synchronize connection.");
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

// mendefinisikan port
app.listen(APP_PORT, () => console.log(`Server running at: http://localhost:${APP_PORT}`));
