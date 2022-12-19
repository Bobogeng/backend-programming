const Student = require("../models/Student");

class StudentController {
    async index(req, res) {
        const students = await Student.all();

        const data = {
            message: "Menampilkan semua students",
            data: students,
        };

        res.json(data);
    }
    async store(req, res) {
        const student = await Student.create(req.body);

        const data = {
            message: "Menambahkan data student",
            data: student,
        };

        res.json(data);
    }
}

const object = new StudentController();

module.exports = object;
