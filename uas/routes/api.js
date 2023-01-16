// import check, validationResult dari express-validator
const { check, validationResult } = require("express-validator");
// import validator
const validator = require("./validator");
// import PatientController
const PatientController = require("../controllers/PatientController");
// import UserController
const UserController = require("../controllers/UserController");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

// Membuat routing get homepage
router.get("/", (req, res) => {
    // Mengirim pesan HTML
    res.send("Hello Covid API Express");
});

// Membuat routing post register dengan validator form register dan mengambil fungsi register dari controller UserController
router.post("/register", validator.register.userValidationRules(), validator.register.validate, UserController.register);
// Membuat routing post login dengan validator form login dan mengambil fungsi login dari controller UserController
router.post("/login", validator.login.userValidationRules(), validator.login.validate, UserController.login);
// Membuat routing get patients dengan mengambil fungsi index dari controller PatientController
router.get("/patients", PatientController.index);
// Membuat routing post patients dengan jwt authentication dan validator form post serta mengambil fungsi store dari controller PatientController dengan parameter id
router.post(
    "/patients",
    UserController.authenticate,
    validator.post.userValidationRules(),
    validator.post.validate,
    PatientController.store
);
// Membuat routing put patients dengan jwt authentication dan validator form put serta mengambil fungsi update dari controller PatientController dengan parameter id
router.put(
    "/patients/:id",
    UserController.authenticate,
    validator.put.userValidationRules(),
    validator.put.validate,
    PatientController.update
);
// Membuat routing delete patients dengan jwt authentication dan mengambil fungsi destroy dari controller PatientController dengan parameter id
router.delete("/patients/:id", UserController.authenticate, PatientController.destroy);
// Membuat routing get patients dengan mengambil fungsi show dari controller PatientController dengan parameter id
router.get("/patients/:id", PatientController.show);
// Membuat routing get patients dengan mengambil fungsi search dari controller PatientController dengan parameter name
router.get("/patients/search/:name", PatientController.search);
// Membuat routing get patients dengan mengambil fungsi positive dari controller PatientController
router.get("/patients/status/positive", PatientController.positive);
// Membuat routing get patients dengan mengambil fungsi recovered dari controller PatientController
router.get("/patients/status/recovered", PatientController.recovered);
// Membuat routing get patients dengan mengambil fungsi dead dari controller PatientController
router.get("/patients/status/dead", PatientController.dead);

// export router
module.exports = router;
