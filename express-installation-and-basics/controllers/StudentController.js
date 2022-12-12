const students = require("../data/students");

class StudentController {
    index(req, res) {
        const data = {
            message: "Menampilkan semua students",
            data: students,
            jumlah: students.length,
        };

        res.json(data);
    }
    store(req, res) {
        const { nama } = req.body;
        const datas = students.push(req.body);

        const data = {
            message: `Menambahkan data student: ${nama}`,
            data: students,
            jumlah: datas,
        };

        res.json(data);
    }
    update(req, res) {
        const { id } = req.params;
        const { nama } = req.body;
        students[id] = req.body;

        const data = {
            message: `Mengedit student id ${id}, nama ${nama}`,
            data: students,
            jumlah: students.length,
        };

        res.json(data);
    }
    destroy(req, res) {
        const { id } = req.params;

        const student = students.indexOf(students[id]);
        if (student > -1) {
            students.splice(student, 1);
        }

        const data = {
            message: `Menghapus student id ${id}`,
            data: students,
            jumlah: students.length,
        };

        res.json(data);
    }
}

const object = new StudentController();

module.exports = object;
