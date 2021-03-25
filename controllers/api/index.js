const router = require('express').Router();
const userRoutes = require('./userRoutes');
const entriesRoutes = require('./projectRoutes');
const commentsRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/entries', entriesRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;