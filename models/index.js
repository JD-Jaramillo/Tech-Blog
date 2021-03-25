const User = require('./User');
const Entry = require('./Entry');
const Comment = require('./Comment');

User.hasMany(Entry, {
    foreignKey: 'user_id'
});

Entry.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(Entry, {
    foreignKey: 'comment_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Entry.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'cascade'
});

module.exports = { User, Entry, Comment };