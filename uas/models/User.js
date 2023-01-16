// import object Model dari sequelize
const { Model } = require("sequelize");

// membuat class User extend dari Model yang menginisialisasi sequelize dan DataTypes yang ada dari database
class User extends Model {
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
                // menginisialisasi column email dengan data type string, dan tidak membiarkan data kosong serta unik dan memastikan formatnya adalah email
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true,
                    },
                },
                // menginisialisasi column password dengan data type string, dan tidak membiarkan data kosong
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            // menetapkan attribute berupa table name users, sequelize, mode name users, dan nama column yang di underscore
            {
                tableName: "users",
                sequelize,
                modelName: "users",
                underscored: true,
            }
        );
    }
}

// export class User
module.exports = User;
