const router = require('express').Router();

const homePageRoutes = require('./homeRoutes');
const dashBoardRoutes = require('./dashBoardRoutes');
const apiRoutes = require('./api');

router.use('/', homePageRoutes);
router.use('/dashboard', dashBoardRoutes);
router.use('/api', apiRoutes);

module.exports = router; 