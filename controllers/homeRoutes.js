const router = require('express').Router();
const sequelize = require('../config/connection');
const { Entry, User, Comment } = require('../models');

// Render the home page
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render the single post page
router.get('/entries/:id', (req, res) => {
    Entry.findOne({
        where: {
            // specify the post id parameter in the query
            id: req.params.id
        },
        // Query configuration, as with the get all posts route
        attributes: [
            'id',
            'entry_text',
            'title',
            'created_at',
        ],
        include: [
            {
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
        .then(dbPostData => {
            // if no post by that id exists, return an error
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            // serialize the post data, removing extra sequelize meta data
            const post = dbPostData.get({ plain: true });
            // pass the posts and a session variable into the single post template
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            // if a server error occured, return an error
            console.log(err);
            res.status(500).json(err);
        });
});

// Render the login page.  If the user is logged in, redirect to the home page.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;