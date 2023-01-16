// import object Model dari sequelize
const { Model } = require("sequelize");

// membuat class Status extend dari Model yang menginisialisasi sequelize dan DataTypes yang ada dari database
class Status extends Model {
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
                // menginisialisasi column status dengan data type string, dan tidak membiarkan data kosong
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            // menetapkan attribute berupa table name status, sequelize, mode name status, dan nama column yang di underscore
            {
                tableName: "status",
                sequelize,
                modelName: "status",
                underscored: true,
            }
        );
    }
}

// export class Status
module.exports = Status;
