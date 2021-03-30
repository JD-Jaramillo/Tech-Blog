const router = require('express').Router();
const userRoutes = require('./userRoutes');
const entriesRoutes = require('./entriesRoutes');
const commentsRoutes = require('./commentsRoutes');

router.use('/users', userRoutes);
router.use('/entries', entriesRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;