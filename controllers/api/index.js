const router = require('express').Router();
const userRoutes = require('./userRoutes');
const entriesRoutes = require('./entriesRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/entries', entriesRoutes);
router.use('/comment', commentRoutes);

module.exports = router;