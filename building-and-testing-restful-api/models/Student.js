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
    static create(req) {
        return new Promise((resolve, reject) => {
            const data = [...Object.values(req), new Date(), new Date()];
            const query = "INSERT INTO students (nama, nim, email, jurusan, created_at, updated_at) VALUES (?)";
            db.query(query, [data], (err, results) => {
                if (err) throw err;
                const query = `SELECT * FROM students WHERE id = ${results.insertId}`;
                db.query(query, (err, results) => {
                    resolve(results);
                });
            });
        });
    }
}

module.exports = Student;
