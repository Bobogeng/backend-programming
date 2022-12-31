const db = require("../config/database");

class Student {
    static all() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM students";
            db.query(query, (err, results) => {
                if (err) throw err;
                resolve(results);
            });
        });
    }
    static async create(req) {
        const id = await new Promise((resolve, reject) => {
            const data = [...Object.values(req), new Date(), new Date()];
            const query = "INSERT INTO students (nama, nim, email, jurusan, created_at, updated_at) VALUES (?)";
            db.query(query, [data], (err, results) => {
                if (err) throw err;
                resolve(results.insertId);
            });
        });

        const student = this.find(id);
        return student;
    }
    static find(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM students WHERE id = ?";
            db.query(query, id, (err, results) => {
                if (err) throw err;
                const [student] = results;
                resolve(student);
            });
        });
    }
    static async update(id, req) {
        await new Promise((resolve, reject) => {
            const query = "UPDATE students SET ?, ? WHERE id = ?";
            db.query(query, [req, { updated_at: new Date() }, id], (err, results) => {
                if (err) throw err;
                resolve(results);
            });
        });

        const student = await this.find(id);
        return student;
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM students WHERE id = ?";
            db.query(query, id, (err, results) => {
                if (err) throw err;
                resolve(results);
            });
        });
    }
}

module.exports = Student;
