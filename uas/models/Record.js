// import object Model dari sequelize
const { Model } = require("sequelize");

// membuat class Record extend dari Model yang menginisialisasi sequelize dan DataTypes yang ada dari database
class Record extends Model {
    // buat method static init
    static init(sequelize, DataTypes) {
        // menginisialisasi init dari parent
        return super.init(
            {
                // menginisialisasi column id dengan data type integer, autoincrement dan sebagai primary key
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                // menginisialisasi column in_date_at dengan data type date, dan tidak membiarkan data kosong
                in_date_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                // menginisialisasi column out_date_at dengan data type date, dan tidak membiarkan data kosong
                out_date_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                // menginisialisasi column patient_id dengan data type integer, dan tidak membiarkan data kosong
                patient_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                // menginisialisasi column status_id dengan data type integer, dan tidak membiarkan data kosong
                status_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            // menetapkan attribute berupa table name records, sequelize, mode name records, dan nama column yang di underscore
            {
                tableName: "records",
                sequelize,
                modelName: "records",
                underscored: true,
            }
        );
    }
}

// export class Record
module.exports = Record;
