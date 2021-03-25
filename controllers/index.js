const router = require('express').router();

const homePageRoutes = require('./home-routes');
const apiRoutes = require('./api');

router.use('/', homePageRoutes);
router.use('/api', apiRoutes);

module.exports = router; 