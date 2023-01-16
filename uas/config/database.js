// import object Sequelize dari sequelize
const { Sequelize } = require("sequelize");
// import Patient dari model
const Patient = require("../models/Patient");
// import Record dari model
const Record = require("../models/Record");
// import Status dari model
const Status = require("../models/Status");
// import User dari model
const User = require("../models/User");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_DIALECT } = process.env;

/**
 * Membuat koneksi database menggunakan sequelize
 * Sequelize menerima parameter object: host, user, password, database, dan dialect
 */
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
});

// menginisialisasikan db dengan object kosong
const db = {};

// mendefinisikan Sequelize
db.Sequelize = Sequelize;
// mendefinisikan sequelize dari koneksi database sequelize yang sudah dibuat
db.sequelize = sequelize;

// menginisialisasi koneksi dari model Record
db.user = User.init(sequelize, Sequelize);

// menginisialisasi koneksi dari model Record
db.record = Record.init(sequelize, Sequelize);

// menginisialisasi koneksi dari model Patient
db.patients = Patient.init(sequelize, Sequelize);

// menginisialisasi koneksi dari model Status
db.status = Status.init(sequelize, Sequelize);

// menginisialisasi koneksi one to many bulak balik dari patients ke table record
db.patients.hasMany(db.record);
db.record.belongsTo(db.patients);
// menginisialisasi koneksi one to many bulak balik dari status ke table record
db.status.hasMany(db.record);
db.record.belongsTo(db.status);

// export db
module.exports = db;
