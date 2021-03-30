const router = require('express').Router();

const homePageRoutes = require('./homeRoutes');
const dashBoardRoutes = require('./dashBoardRoutes');
const apiRoutes = require('./api');

router.use('/', homePageRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashBoardRoutes);

module.exports = router; 