const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(userPass) {
        return bcrypt.compareSync(userPass, this.password);
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
    },
    {
        hooks: {
            async beforeCreate(newLoginInfo) {
                newLoginInfo.password = await bcrypt.hash(newLoginInfo.password, 10);
                return newLoginInfo;
            },
            async beforeUpdate(updatedLoginInfo) {
                updatedLoginInfo.password = await bcrypt.hash(updatedLoginInfo.password, 10);
                return updatedLoginInfo;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User; 