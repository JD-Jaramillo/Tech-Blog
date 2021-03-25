const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Entry extends Model { }

Entry.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entry_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'entry'
    }
);

module.exports = Entry; 