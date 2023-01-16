// import body, dan validationResult dari express-validator
const { body, validationResult } = require("express-validator");

// membuat object untuk validator form
const validator = {
    // membuat object untuk validator form register
    register: {
        // membuat fungsi userValidationRules
        userValidationRules: () => {
            return [
                // mengecheck body dari form name
                body("name")
                    // mengecheck empty form pada body dari form name
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form name
                    .withMessage("Name can't be empty")
                    // mengecheck alphabet dengan fomat US dan meng-ignore spasi form pada body dari form name
                    .isAlpha("en-US", { ignore: " " })
                    // mengirim pesan alphabet dengan fomat US dan meng-ignore spasi form pada body dari form name
                    .withMessage("Name must be alphabet"),
                // mengecheck empty form dan memastikan format email pada body dari form email
                body("email").not().isEmpty().withMessage("Email can't be empty").isEmail().withMessage("Invalid email address"),
                // mengecheck body dari form password
                body("password")
                    // mengecheck empty form pada body dari form password
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form password
                    .withMessage("Password can't be empty")
                    // mengecheck panjang minimal 8 dan maksimal 16 pada body dari form password
                    .isLength({ min: 8, max: 16 })
                    // mengirim pesan panjang minimal 8 dan maksimal 16 pada body dari form password
                    .withMessage("Password must have 8 characters and no longer than 16 characters")
                    // mengecheck format password harus berupa minimal 1 huruf kecil, 1 huruf besar, 1 nomor, dan 1 symbol form pada body dari form password
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
                    // mengirim pesan format password harus berupa minimal 1 huruf kecil, 1 huruf besar, 1 nomor, dan 1 symbol form pada body dari form password
                    .withMessage("Password must have 1 lowercase, 1 uppercase, 1 number, and 1 symbol"),
                // mengecheck body dari form confirm password
                body("confirm_password")
                    // mengecheck empty form pada body dari form confirm password
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form confirm password
                    .withMessage("Confirm Password can't be empty")
                    // mengecheck panjang minimal 8 dan maksimal 16 pada body dari form confirm password
                    .isLength({ min: 8, max: 16 })
                    // mengirim pesan panjang minimal 8 dan maksimal 16 pada body dari form confirm password
                    .withMessage("Confirm Password must have 8 characters and no longer than 16 characters")
                    // mengecheck format confirm password harus berupa minimal 1 huruf kecil, 1 huruf besar, 1 nomor, dan 1 symbol form pada body dari form confirm password
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
                    // mengirim pesan format confirm password harus berupa minimal 1 huruf kecil, 1 huruf besar, 1 nomor, dan 1 symbol form pada body dari form confirm password
                    .withMessage("Confirm Password must have 1 lowercase, 1 uppercase, 1 number, and 1 symbol")
                    // mengecheck confirm password harus sama dengan password form pada body dari form confirm password
                    .custom((confirm_password, { req }) => confirm_password === req.body.password)
                    // mengirim pesan confirm password harus sama dengan password form pada body dari form confirm password
                    .withMessage("Confirm Password must be same"),
            ];
        },
        // membuat fungsi validate
        validate: (req, res, next) => {
            // membuat variable errors untuk memformat error dengan mengembalikan msg dari validationResult
            const errors = validationResult(req).formatWith(({ msg }) => msg);

            // mengecheck errors null atau tidak
            if (errors.isEmpty()) {
                // melakukan next request
                return next();
            }

            // mengembalikan respon 422 yang menandakan form tidak diisi dengan semestinya
            return res.status(422).json({ messages: "All fields must be filled correctly", errors: errors.array() });
        },
    },
    // membuat object untuk validator form login
    login: {
        // membuat fungsi userValidationRules
        userValidationRules: () => {
            return [
                // mengecheck empty form dan memastikan format email pada body dari form email
                body("email").not().isEmpty().withMessage("Email can't be empty").isEmail().withMessage("Invalid email address"),
                // mengecheck body dari form password
                body("password")
                    // mengecheck empty form pada body dari form password
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form password
                    .withMessage("Password can't be empty")
                    // mengecheck panjang minimal 8 dan maksimal 16 pada body dari form password
                    .isLength({ min: 8, max: 16 })
                    // mengirim pesan panjang minimal 8 dan maksimal 16 pada body dari form password
                    .withMessage("Password must have 8 characters and no longer than 16 characters")
                    // mengecheck format password harus berupa minimal 1 huruf kecil, 1 huruf besar, 1 nomor, dan 1 symbol form pada body dari form password
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
                    // mengirim pesan format password harus berupa minimal 1 huruf kecil, 1 huruf besar, 1 nomor, dan 1 symbol form pada body dari form password
                    .withMessage("Password must have 1 lowercase, 1 uppercase, 1 number, and 1 symbol"),
            ];
        },
        // membuat fungsi validate
        validate: (req, res, next) => {
            // membuat variable errors untuk memformat error dengan mengembalikan msg dari validationResult
            const errors = validationResult(req).formatWith(({ msg }) => msg);

            // mengecheck errors null atau tidak
            if (errors.isEmpty()) {
                // melakukan next request
                return next();
            }

            // mengembalikan respon 422 yang menandakan form tidak diisi dengan semestinya
            return res.status(422).json({ messages: "All fields must be filled correctly", errors: errors.array() });
        },
    },
    // membuat object untuk validator form post
    post: {
        // membuat fungsi userValidationRules
        userValidationRules: () => {
            return [
                // mengecheck body dari form name
                body("name")
                    // mengecheck empty form pada body dari form name
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form name
                    .withMessage("Name can't be empty")
                    // mengecheck alphabet dengan fomat US dan meng-ignore spasi form pada body dari form name
                    .isAlpha("en-US", { ignore: " " })
                    // mengirim pesan alphabet dengan fomat US dan meng-ignore spasi form pada body dari form name
                    .withMessage("Name must be alphabet"),
                // mengecheck body dari form phone
                body("phone")
                    // mengecheck empty form pada body dari form phone
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form phone
                    .withMessage("Phone number can't be empty")
                    // mengecheck format nomor hp pada body dari form phone
                    .isMobilePhone()
                    // mengirim pesan format nomor hp pada body dari form phone
                    .withMessage("Invalid phone number"),
                // mengecheck empty form pada body dari form address
                body("address").not().isEmpty().withMessage("Address can't be empty"),
                // mengecheck body dari form status
                body("status")
                    // mengecheck empty form pada body dari form status
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form status
                    .withMessage("Status can't be empty")
                    // mengecheck alphabet dengan fomat US dan meng-ignore spasi form pada body dari form status
                    .isAlpha("en-US", { ignore: " " })
                    // mengirim pesan alphabet dengan fomat US dan meng-ignore spasi form pada body dari form status
                    .withMessage("Name must be alphabet"),
                // mengecheck empty form dan memastikan format in_date_at pada body dari form in_date_at
                body("in_date_at").not().isEmpty().withMessage("In date at can't be empty").isDate().withMessage("In date at must be date"),
                // mengecheck empty form dan memastikan format out_date_at pada body dari form out_date_at
                body("out_date_at")
                    .not()
                    .isEmpty()
                    .withMessage("Out date at can't be empty")
                    .isDate()
                    .withMessage("Out date at must be date"),
            ];
        },
        // membuat fungsi validate
        validate: (req, res, next) => {
            // membuat variable errors untuk memformat error dengan mengembalikan msg dari validationResult
            const errors = validationResult(req).formatWith(({ msg }) => msg);

            // mengecheck errors null atau tidak
            if (errors.isEmpty()) {
                // melakukan next request
                return next();
            }

            // mengembalikan respon 422 yang menandakan form tidak diisi dengan semestinya
            return res.status(422).json({ messages: "All fields must be filled correctly", errors: errors.array() });
        },
    },
    // membuat object untuk validator form put
    put: {
        // membuat fungsi userValidationRules
        userValidationRules: () => {
            return [
                // mengecheck body dari form name
                body("name")
                    // mengecheck empty form pada body dari form name
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form name
                    .withMessage("Name can't be empty")
                    // mengecheck alphabet dengan fomat US dan meng-ignore spasi form pada body dari form name
                    .isAlpha("en-US", { ignore: " " })
                    // mengirim pesan alphabet dengan fomat US dan meng-ignore spasi form pada body dari form name
                    .withMessage("Name must be alphabet"),
                // mengecheck body dari form phone
                body("phone")
                    // mengecheck empty form pada body dari form phone
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form phone
                    .withMessage("Phone number can't be empty")
                    // mengecheck format nomor hp pada body dari form phone
                    .isMobilePhone()
                    // mengirim pesan format nomor hp pada body dari form phone
                    .withMessage("Invalid phone number"),
                // mengecheck empty form pada body dari form address
                body("address").not().isEmpty().withMessage("Address can't be empty"),
                // mengecheck body dari form status
                body("status")
                    // mengecheck empty form pada body dari form status
                    .not()
                    .isEmpty()
                    // mengirim pesan empty form pada body dari form status
                    .withMessage("Status can't be empty")
                    // mengecheck alphabet dengan fomat US dan meng-ignore spasi form pada body dari form status
                    .isAlpha("en-US", { ignore: " " })
                    // mengirim pesan alphabet dengan fomat US dan meng-ignore spasi form pada body dari form status
                    .withMessage("Name must be alphabet"),
                // mengecheck empty form dan memastikan format in_date_at pada body dari form in_date_at
                body("in_date_at").not().isEmpty().withMessage("In date at can't be empty").isDate().withMessage("In date at must be date"),
                // mengecheck empty form dan memastikan format out_date_at pada body dari form out_date_at
                body("out_date_at")
                    .not()
                    .isEmpty()
                    .withMessage("Out date at can't be empty")
                    .isDate()
                    .withMessage("Out date at must be date"),
            ];
        },
        // membuat fungsi validate
        validate: (req, res, next) => {
            // membuat variable errors untuk memformat error dengan mengembalikan msg dari validationResult
            const errors = validationResult(req).formatWith(({ msg }) => msg);

            // mengecheck errors null atau tidak
            if (errors.isEmpty()) {
                // melakukan next request
                return next();
            }

            // mengembalikan respon 422 yang menandakan form tidak diisi dengan semestinya
            return res.status(422).json({ messages: "All fields must be filled correctly", errors: errors.array() });
        },
    },
};

// meng-export module dari validator
module.exports = validator;
