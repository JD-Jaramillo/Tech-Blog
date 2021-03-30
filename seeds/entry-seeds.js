const { Entry } = require('../models');

const entryData = [
    {
        title: 'This is the first entry in my journal',
        entry_text: 'Wow what a day I had, if only my dog was here',
        user_id: '1',
    },
    {
        title: 'Recipe 1',
        entry_text: 'Cheese, milk, and eggs',
        user_id: '2',
    },
    {
        title: 'This is a new title of my entry',
        entry_text: 'this is a sample titiel',
        user_id: '3',
    },
];

const seedEntries = () => Entry.bulkCreate(entryData);

module.exports = seedEntries;