// import object sequelize dari database
const { sequelize } = require("../config/database");
// import Op dari Sequelize
const { Op } = require("sequelize");
// import Patient dari model
const Patient = require("../models/Patient");
// import Record dari model
const Record = require("../models/Record");
// import Status dari model
const Status = require("../models/Status");

// buat class PatientController
class PatientController {
    // buat method async index
    async index(req, res) {
        // mencari semua record dan menginclude relasi Patient dan Status
        const records = await Record.findAll({ include: [Patient, Status] });

        // mengecheck data records lebih dari 0
        if (records.length > 0) {
            // mengembalikan message dan data berstatus code 200
            const data = {
                message: "Get All Resource",
                data: records.map((data) => {
                    return {
                        id: data.id,
                        name: data.patient.name,
                        phone: data.patient.phone,
                        address: data.patient.address,
                        status: data.status.status,
                        in_date_at: data.in_date_at,
                        out_date_at: data.out_date_at,
                        created_at: data.createdAt,
                        updated_at: data.updatedAt,
                    };
                }),
            };

            return res.status(200).json(data);
        }

        // mengembalikan message dan berstatus code 200
        const data = {
            message: "Data is empty",
        };

        return res.status(200).json(data);
    }

    // buat method async store
    async store(req, res) {
        // destructuring req.body
        const { name, phone, address, status, in_date_at, out_date_at } = req.body;

        // check req.body kosong atau tidak
        if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
            // jika kosong kembalikan error 422
            const data = {
                message: "All fields must be filled correctly",
            };

            return res.status(422).json(data);
        }

        // mengambil transaction dari sequelize
        const transaction = await sequelize.transaction();

        // melakukan try and catch
        try {
            // mencari record
            const record = await Record.findOne({
                include: [
                    // menginclude model Patient dan mencari berdasarkan phone
                    { model: Patient, where: { phone: phone } },
                ],
            });

            // mencari status dimana status sama dengan status dari req.body
            const statusCheck = await Status.findOne({ where: { status: status } });

            // mengecheck apabila record kosong, maka membuat patient dan status baru
            if (!record) {
                // membuat patient baru dan mendaftarkannya ke transaction
                const patient = await Patient.create({ name, phone, address }, { transaction }).then((patient) => {
                    return patient;
                });

                // mengecheck apakah status tidak ada
                if (!statusCheck) {
                    // membuat status baru dan mendaftarkannya ke transaction
                    const statusPatient = await Status.create({ status }, { transaction }).then((status) => {
                        return status;
                    });

                    // membuat record baru dan mendaftarkannya ke transaction
                    const recordPatient = await Record.create(
                        { in_date_at, out_date_at, patient_id: patient.id, status_id: statusPatient.id },
                        { transaction }
                    ).then((record) => {
                        return record;
                    });

                    // meng-commit seluruh transaction
                    await transaction.commit();

                    // mengembalikan message, dan data serta status code 201
                    const data = {
                        message: "Resource is added successfully",
                        data: {
                            id: recordPatient.id,
                            name: patient.name,
                            phone: patient.phone,
                            address: patient.address,
                            status: statusPatient.status,
                            in_date_at: recordPatient.in_date_at,
                            out_date_at: recordPatient.out_date_at,
                            created_at: recordPatient.createdAt,
                            updated_at: recordPatient.updatedAt,
                        },
                    };

                    return res.status(201).json(data);
                }

                // membuat record baru dan mendaftarkannya ke transaction
                const recordPatient = await Record.create(
                    { in_date_at, out_date_at, patient_id: patient.id, status_id: statusCheck.id },
                    { transaction }
                ).then((record) => {
                    return record;
                });

                // meng-commit seluruh transaction
                await transaction.commit();

                // mengembalikan message, dan data serta status code 201
                const data = {
                    message: "Resource is added successfully",
                    data: {
                        id: recordPatient.id,
                        name: patient.name,
                        phone: patient.phone,
                        address: patient.address,
                        status: statusCheck.status,
                        in_date_at: recordPatient.in_date_at,
                        out_date_at: recordPatient.out_date_at,
                        created_at: recordPatient.createdAt,
                        updated_at: recordPatient.updatedAt,
                    },
                };

                return res.status(201).json(data);
            }

            // mengecheck apakah status tidak ada
            if (!statusCheck) {
                // membuat status baru dan mendaftarkannya ke transaction
                const statusPatient = await Status.create({ status }, { transaction }).then((status) => {
                    return status;
                });

                // membuat record baru dan mendaftarkannya ke transaction
                const recordPatient = await Record.create(
                    { in_date_at, out_date_at, patient_id: record.patient.id, status_id: statusPatient.id },
                    { transaction }
                ).then((record) => {
                    return record;
                });

                // meng-commit seluruh transaction
                await transaction.commit();

                // mengembalikan message, dan data serta status code 201
                const data = {
                    message: "Resource is added successfully",
                    data: {
                        id: recordPatient.id,
                        name: record.patient.name,
                        phone: record.patient.phone,
                        address: record.patient.address,
                        status: statusPatient.status,
                        in_date_at: recordPatient.in_date_at,
                        out_date_at: recordPatient.out_date_at,
                        created_at: recordPatient.createdAt,
                        updated_at: recordPatient.updatedAt,
                    },
                };

                return res.status(201).json(data);
            }

            // membuat record baru dan mendaftarkannya ke transaction
            const recordPatient = await Record.create(
                { in_date_at, out_date_at, patient_id: record.patient.id, status_id: statusCheck.id },
                { transaction }
            ).then((record) => {
                return record;
            });

            // meng-commit seluruh transaction
            await transaction.commit();

            // mengembalikan message, dan data serta status code 201
            const data = {
                message: "Resource is added successfully",
                data: {
                    id: recordPatient.id,
                    name: record.patient.name,
                    phone: record.patient.phone,
                    address: record.patient.address,
                    status: statusCheck.status,
                    in_date_at: recordPatient.in_date_at,
                    out_date_at: recordPatient.out_date_at,
                    created_at: recordPatient.createdAt,
                    updated_at: recordPatient.updatedAt,
                },
            };

            return res.status(201).json(data);
        } catch (error) {
            // mengecheck error dan melakukan rollback jika terjadi error
            await transaction.rollback();
            // mengembalikan message, dan error berstatus code 422
            return res.status(422).json({
                message: "All fields must be filled correctly",
                error: error.errors ? error.errors[0].message : error,
            });
        }
    }

    // buat method async update
    async update(req, res) {
        // mengambil id dari req.params
        const { id } = req.params;
        // destructuring req.body
        const { name, phone, address, status, in_date_at, out_date_at } = req.body;

        // check req.body kosong atau tidak
        if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
            // jika kosong kembalikan error 422
            const data = {
                message: "All fields must be filled correctly",
            };

            return res.status(422).json(data);
        }

        // mengambil transaction dari sequelize
        const transaction = await sequelize.transaction();

        // mencari record berdasarkan primary key id, dan memasukkanya kedalam transaction
        const record = await Record.findByPk(id, { transaction });

        // mengecheck apakah record kosong atau tidak
        if (!record) {
            // mengembalikan message dan berstatus code 404
            return res.status(404).json({
                message: "Resource not found",
            });
        }

        // melakukan try and catch
        try {
            // mencari status dimana status sama dengan status dari req.body
            const statusCheck = await Status.findOne({ where: { status: status } });

            // mengupdate patient dan mendaftarkannya ke transaction
            const patient = await record.getPatient().then((patient) => {
                return patient.update({ name, phone, address }, { transaction }).then((data) => {
                    return data;
                });
            });

            // mengecheck apakah status tidak ada
            if (!statusCheck) {
                // membuat status baru dan mendaftarkannya ke transaction
                const statusPatient = await Status.create({ status }, { transaction }).then((status) => {
                    return status;
                });

                // mengupdate record dan mendaftarkannya ke transaction
                const recordPatient = await record
                    .update({ in_date_at, out_date_at, patient_id: patient.id, status_id: statusPatient.id }, { transaction })
                    .then((data) => {
                        return data;
                    });

                // meng-commit seluruh transaction
                await transaction.commit();

                // mengembalikan message, dan data serta status code 200
                const data = {
                    message: "Resource is update successfully",
                    data: {
                        id: recordPatient.id,
                        name: patient.name,
                        phone: patient.phone,
                        address: patient.address,
                        status: statusPatient.status,
                        in_date_at: recordPatient.in_date_at,
                        out_date_at: recordPatient.out_date_at,
                        created_at: recordPatient.createdAt,
                        updated_at: recordPatient.updatedAt,
                    },
                };

                return res.status(200).json(data);
            }

            // mengupdate record dan mendaftarkannya ke transaction
            const recordPatient = await record
                .update({ in_date_at, out_date_at, patient_id: patient.id, status_id: statusCheck.id }, { transaction })
                .then((data) => {
                    return data;
                });

            // meng-commit seluruh transaction
            await transaction.commit();

            // mengembalikan message, dan data serta status code 200
            const data = {
                message: "Resource is update successfully",
                data: {
                    id: recordPatient.id,
                    name: patient.name,
                    phone: patient.phone,
                    address: patient.address,
                    status: statusCheck.status,
                    in_date_at: recordPatient.in_date_at,
                    out_date_at: recordPatient.out_date_at,
                    created_at: recordPatient.createdAt,
                    updated_at: recordPatient.updatedAt,
                },
            };

            return res.status(200).json(data);
        } catch (error) {
            // mengecheck error dan melakukan rollback jika terjadi error
            await transaction.rollback();
            // mengembalikan message, dan error berstatus code 422
            return res.status(422).json({
                message: "All fields must be filled correctly",
                error: error.errors ? error.errors[0].message : error,
            });
        }
    }

    // buat method async destroy
    async destroy(req, res) {
        // mengambil id dari req.params
        const { id } = req.params;

        // mengambil transaction dari sequelize
        const transaction = await sequelize.transaction();

        // mencari record berdasarkan primary key id, dan memasukkanya kedalam transaction
        const record = await Record.findByPk(id, { transaction });

        // mengecheck apakah record kosong atau tidak
        if (!record) {
            // mengembalikan message dan berstatus code 404
            return res.status(404).json({
                message: "Resource not found",
            });
        }

        // menghapus record yang telah ditemukan
        await record.destroy(record.id, { transaction });

        // mengecheck patient yang memiliki patient_id yang sama dengan record yg sudah dihapus
        const patientCheck = await Record.findOne({ where: { patient_id: record.patient_id } });
        // mengecheck status yang memiliki status_id yang sama dengan record yg sudah dihapus
        const statusCheck = await Record.findOne({ where: { status_id: record.status_id } });

        // melakukan try and catch
        try {
            // mengecheck patientCheck dan patientCheck ada
            if (patientCheck && patientCheck) {
                // meng-commit seluruh transaction
                await transaction.commit();

                // mengembalikan message, dan data serta status code 200
                const data = {
                    message: "Resource is delete successfully",
                };

                return res.status(200).json(data);
            }

            // mengecheck patientCheck
            if (patientCheck) {
                // mencari status dari record yang telah ditemukan dan menghapusnya
                await record.getStatus().then((statusPatient) => {
                    return statusPatient.destroy(statusPatient.id, { transaction });
                });

                // meng-commit seluruh transaction
                await transaction.commit();

                // mengembalikan message, dan data serta status code 200
                const data = {
                    message: "Resource is delete successfully, with status deleted",
                };

                return res.status(200).json(data);
            }

            // mengecheck statusCheck
            if (statusCheck) {
                // mencari patient dari record yang telah ditemukan dan menghapusnya
                await record.getPatient().then((patient) => {
                    return patient.destroy(patient.id, { transaction });
                });

                // meng-commit seluruh transaction
                await transaction.commit();

                // mengembalikan message, dan data serta status code 200
                const data = {
                    message: "Resource is delete successfully, with patient deleted",
                };

                return res.status(200).json(data);
            }

            // mencari patient dari record yang telah ditemukan dan menghapusnya
            await record.getPatient().then((patient) => {
                return patient.destroy(patient.id, { transaction });
            });

            // mencari status dari record yang telah ditemukan dan menghapusnya
            await record.getStatus().then((statusPatient) => {
                return statusPatient.destroy(statusPatient.id, { transaction });
            });

            // meng-commit seluruh transaction
            await transaction.commit();

            // mengembalikan message, dan data serta status code 200
            const data = {
                message: "Resource is delete successfully, with patient and status deleted",
            };

            return res.status(200).json(data);
        } catch (error) {
            // mengecheck error dan melakukan rollback jika terjadi error
            await transaction.rollback();
            // mengembalikan message, dan berstatus code 500
            return res.status(500).json({
                message: error.message,
            });
        }
    }

    // buat method async show
    async show(req, res) {
        // mengambil id dari req.params
        const { id } = req.params;

        // mencari record berdasarkan primary key id dan menginclude relation Patient dan Status
        const record = await Record.findByPk(id, { include: [Patient, Status] });

        // mengecheck record ada atau tidak
        if (record) {
            // mengembalikan message, dan data serta status code 200
            const data = {
                message: "Get Detail Resource",
                data: {
                    id: record.id,
                    name: record.patient.name,
                    phone: record.patient.phone,
                    address: record.patient.address,
                    status: record.status.status,
                    in_date_at: record.in_date_at,
                    out_date_at: record.out_date_at,
                    created_at: record.createdAt,
                    updated_at: record.updatedAt,
                },
            };

            return res.status(200).json(data);
        }

        // mengembalikan message dan berstatus code 404
        const data = {
            message: "Resource not found",
        };

        return res.status(404).json(data);
    }

    // buat method async search
    async search(req, res) {
        const { name } = req.params;

        // mencari semua records dan menginclude relation model Patient dimana name mirip dengan name dari req.params, serta model Status
        const records = await Record.findAll({ include: [{ model: Patient, where: { name: { [Op.substring]: name } } }, Status] });

        // mengecheck data records lebih dari 0
        if (records.length > 0) {
            // mengembalikan message, dan data serta status code 200
            const data = {
                message: "Get searched resource",
                data: records.map((data) => {
                    return {
                        id: data.id,
                        name: data.patient.name,
                        phone: data.patient.phone,
                        address: data.patient.address,
                        status: data.status.status,
                        in_date_at: data.in_date_at,
                        out_date_at: data.out_date_at,
                        created_at: data.createdAt,
                        updated_at: data.updatedAt,
                    };
                }),
            };

            return res.status(200).json(data);
        }

        // mengembalikan message dan berstatus code 404
        const data = {
            message: "Resource not found",
        };

        return res.status(404).json(data);
    }

    // buat method async positive
    async positive(req, res) {
        // mencari semua records dan menginclude relation model Patient, serta Status dimana satatus mirip dengan string positive
        const records = await Record.findAll({ include: [Patient, { model: Status, where: { status: { [Op.substring]: "positive" } } }] });

        // mengecheck data records lebih dari 0
        if (records.length > 0) {
            // mengembalikan message, dan data serta status code 200
            const data = {
                message: "Get positive resource",
                total: records.length,
                data: records.map((data) => {
                    return {
                        id: data.id,
                        name: data.patient.name,
                        phone: data.patient.phone,
                        address: data.patient.address,
                        status: data.status.status,
                        in_date_at: data.in_date_at,
                        out_date_at: data.out_date_at,
                        created_at: data.createdAt,
                        updated_at: data.updatedAt,
                    };
                }),
            };

            return res.status(200).json(data);
        }

        // mengembalikan message dan berstatus code 404
        const data = {
            message: "Resource not found",
        };

        return res.status(404).json(data);
    }

    // buat method async recovered
    async recovered(req, res) {
        // mencari semua records dan menginclude relation model Patient, serta Status dimana satatus mirip dengan string recovered
        const records = await Record.findAll({ include: [Patient, { model: Status, where: { status: { [Op.substring]: "recovered" } } }] });

        // mengecheck data records lebih dari 0
        if (records.length > 0) {
            // mengembalikan message, dan data serta status code 200
            const data = {
                message: "Get recovered resource",
                total: records.length,
                data: records.map((data) => {
                    return {
                        id: data.id,
                        name: data.patient.name,
                        phone: data.patient.phone,
                        address: data.patient.address,
                        status: data.status.status,
                        in_date_at: data.in_date_at,
                        out_date_at: data.out_date_at,
                        created_at: data.createdAt,
                        updated_at: data.updatedAt,
                    };
                }),
            };

            return res.status(200).json(data);
        }

        // mengembalikan message dan berstatus code 404
        const data = {
            message: "Resource not found",
        };

        return res.status(404).json(data);
    }

    // buat method async dead
    async dead(req, res) {
        // mencari semua records dan menginclude relation model Patient, serta Status dimana satatus mirip dengan string dead
        const records = await Record.findAll({ include: [Patient, { model: Status, where: { status: { [Op.substring]: "dead" } } }] });

        // mengecheck data records lebih dari 0
        if (records.length > 0) {
            // mengembalikan message, dan data serta status code 200
            const data = {
                message: "Get dead resource",
                total: records.length,
                data: records.map((data) => {
                    return {
                        id: data.id,
                        name: data.patient.name,
                        phone: data.patient.phone,
                        address: data.patient.address,
                        status: data.status.status,
                        in_date_at: data.in_date_at,
                        out_date_at: data.out_date_at,
                        created_at: data.createdAt,
                        updated_at: data.updatedAt,
                    };
                }),
            };

            return res.status(200).json(data);
        }

        // mengembalikan message dan berstatus code 404
        const data = {
            message: "Resource not found",
        };

        return res.status(404).json(data);
    }
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
