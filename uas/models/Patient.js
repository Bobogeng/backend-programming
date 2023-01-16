// import object Model dari sequelize
const { Model } = require("sequelize");

// membuat class Patient extend dari Model yang menginisialisasi sequelize dan DataTypes yang ada dari database
class Patient extends Model {
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
                // menginisialisasi column name dengan data type string, dan tidak membiarkan data kosong
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                // menginisialisasi column phone dengan data type string, dan tidak membiarkan data kosong serta unik
                phone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                // menginisialisasi column address dengan data type text, dan tidak membiarkan data kosong
                address: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
            },
            // menetapkan attribute berupa table name patients, sequelize, mode name patients, dan nama column yang di underscore
            {
                tableName: "patients",
                sequelize,
                modelName: "patients",
                underscored: true,
            }
        );
    }
}

// export class Patient
module.exports = Patient;
