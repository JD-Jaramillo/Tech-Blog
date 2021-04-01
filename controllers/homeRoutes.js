const router = require('express').Router();
const { Entry, User, Comment } = require('../models');

// Render the home page
router.get('/', (req, res) => {
    Entry.findAll({
        attributes: [
            'id',
            'entry_text',
            'title',
            'created_at',
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'entry_id', 'user_id', 'created_at']
            }
        ]
    })
        // render the posts
        .then(dbPostData => {
            // create an array for the posts, using the get method to trim extra sequelize object data out
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // pass the posts into the homepage template
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        // if there was a server error, return the error
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'entry_id', 'user_id', 'created_at']
            }
        ]
    })
        .then(dbPostData => {
            // if no post by that id exists, return an error
            if (!dbPostData) {
                res.status(404).json({ message: 'No entry found with this id' });
                return;
            }
            // serialize the post data, removing extra sequelize meta data
            const post = dbPostData.get({ plain: true });
            // pass the posts and a session variable into the single post template
            res.render('singleEntry', {
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
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

module.exports = router;