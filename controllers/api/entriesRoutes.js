// const router = require('express').Router();
// const { User, Entry, Comment } = require('../../models');
// const session = require('express-session');
// const withAuthorization = require('../../utils/auth');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);



// module.exports = router; 
// Dependencies
// Express.js connection
const router = require('express').Router();
// User Model, Post Model, and Comment Model
const { User, Entry, Comment } = require('../../models');
// Sequelize database connection
const sequelize = require('../../config/connection');
// Authorization Helper
const withAuth = require('../../utils/auth');

// Routes

// GET api/posts/ -- get all posts
router.get('/', (req, res) => {
    Entry.findAll({
        // Query configuration
        // From the Post table, include the post ID, URL, title, and the timestamp from post creation
        attributes: [
            'id',
            'entry_text',
            'title',
            'created_at',
        ],
        // Order the posts from most recent to least
        order: [['created_at', 'DESC']],
        // From the User table, include the post creator's user name
        // From the Comment table, include all comments
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'entry_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
        ]
    })
        // return the posts
        .then(dbPostData => res.json(dbPostData))
        // if there was a server error, return the error
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET api/posts/:id -- get a single post by id
router.get('/:id', (req, res) => {
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
                attributes: ['id', 'comment_text', 'entry_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
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
            res.json(dbPostData);
        })
        .catch(err => {
            // if a server error occured, return an error
            console.log(err);
            res.status(500).json(err);
        });
});

// POST api/posts -- create a new post
router.post('/', withAuth, (req, res) => {
    // expects object of the form {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', user_id: 1}
    Entry.create({
        title: req.body.title,
        entry_text: req.body.entry_text,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT api/posts/1-- update a post's title or text
router.put('/:id', withAuth, (req, res) => {
    Entry.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// DELETE api/posts/1 -- delete a post
router.delete('/:id', withAuth, (req, res) => {
    Entry.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;