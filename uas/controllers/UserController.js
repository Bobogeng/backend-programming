// import User dari model
const User = require("../models/User");
// import jwt dari jsonwebtoken
const jwt = require("jsonwebtoken");
// import bcrypt
const bcrypt = require("bcrypt");

// buat class UserController
class UserController {
    // buat method async register
    async register(req, res) {
        // destructuring req.body
        const { name, email, password, confirm_password } = req.body;

        // check req.body kosong atau tidak
        if (!name || !email || !password || !confirm_password) {
            // jika kosong kembalikan error 422
            const data = {
                message: "All fields must be filled correctly",
            };

            return res.status(422).json(data);
        }

        // hashing password yang diterima dengan salt (kompleksifitas) 10
        const hash = await bcrypt.hash(password, 10);

        // membuat user baru dengan nama, email, dan hash yang telah dibuat
        await User.create({ name, email, password: hash })
            .then((user) => {
                // membuat access token untuk mengenerate token jwt kepada user
                const accessToken = UserController.generateAccessToken(user);

                // mengembalikan message dan token berstatus 201
                const data = {
                    message: "User is successfully registered",
                    token: accessToken,
                };

                return res.status(201).json(data);
            })
            .catch((error) => {
                // mengembalikan message dan error berstatus 422
                return res.status(422).json({
                    message: "All fields must be filled correctly",
                    error: error.errors ? error.errors[0].message : error,
                });
            });
    }

    // buat method async login
    async login(req, res) {
        // destructuring req.body
        const { email, password } = req.body;

        // check req.body kosong atau tidak
        if (!email || !password) {
            // jika kosong kembalikan error 422
            const data = {
                message: "All fields must be filled correctly",
            };

            return res.status(422).json(data);
        }

        // mencari user dimana email sama denan email dari req.body
        const user = await User.findOne({ where: { email: email } });

        // mengecheck jika user tidak ditemukan dan mengembalikan message dan error berstatus 403
        if (!user) {
            return res.status(403).json({
                message: "Invalid email or password",
            });
        }

        // mengcompare password dari user yang telah ditemukan dengan password dari req.body
        const compareHash = await bcrypt.compare(password, user.password);

        // mengecheck jika compare hash tidak sesuai dan mengembalikan message dan error berstatus 403
        if (!compareHash) {
            return res.status(403).json({
                message: "Invalid email or password",
            });
        }

        // membuat access token untuk mengenerate token jwt kepada user
        const accessToken = UserController.generateAccessToken(user);

        // mengembalikan message dan token berstatus 200
        const data = {
            message: "User is login successfully",
            token: accessToken,
        };

        return res.status(200).json(data);
    }

    // buat method static generateAccessToken
    static generateAccessToken(user) {
        return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    }

    // buat method authenticate
    authenticate(req, res, next) {
        // mengambil request headers authorization dari req.headers
        const authHeader = req.headers["authorization"];
        // mengambil dan memisahkan bearer dari string token, yaitu dengan cara split dan mengambil array kedua
        const token = authHeader && authHeader.split(" ")[1];

        // mengecheck jika token tidak ditemukan dan mengembalikan message dan error berstatus 401
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        // memverifikasi token menggunakan jwt dengan secret key dari env dan callback
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            // check jika terjadi error berarti token tidak valid dan mengembalikan message dan error berstatus 403
            if (error) {
                return res.status(403).json({
                    message: "Not a valid token",
                });
            }

            // menetapkan req.user dengan user yang sudah diverifikasi
            req.user = user;
            // melakukan request selanjutnya
            next();
        });
    }
}

// membuat object PatientController
const object = new UserController();

// export object PatientController
module.exports = object;
