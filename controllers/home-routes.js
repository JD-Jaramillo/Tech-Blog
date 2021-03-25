const router = require('express').Router();
const { User, Entry, Comment } = require('../models');
const withAuthorization = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        Entry.findAll({
            attributes:
                [
                    'id',
                    'title',
                    'entry_text',
                    'created_at',
                ],
            order: [['created_ at', 'DESC']],

            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'entry_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]
        })
            .then(dbAllEntries => {
                const entries = dbAllEntries.map(entry => entry.get({ plain: true }));
                res.render('homepage', {
                    entries,
                    loggedIn: req.session.loggedIn
                });
            })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', (req, res) => {
    try {
        Entry.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'entry_text',
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment, attributes: [
                        'id',
                        'title',
                        'entry_text',
                        'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
            .then(dbSingleEntry => {
                if (!dbSingleEntry) {
                    res.status(404).json({ message: 'No Entry found with this id' });
                    return;
                }
                const entry = dbSingleEntry.get({ plain: true });
                res.render('single-post' {
                    entry,
                    loggedIn: req.session.loggedIn
                });
            })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router; 