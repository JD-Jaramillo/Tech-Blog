const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedEntries = require('./entry-seeds');
const seedComments = require('./comments-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    console.log('Users Seeded');
    await seedEntries();
    console.log('Entries Seeded');
    await seedComments();
    console.log('Comments Seeded');
    process.exit(0);
};

seedAll();