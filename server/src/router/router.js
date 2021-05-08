const router = require('express').Router();
const apiRouterAuth = require('./api/auth.js');
const apiRouterUser = require('./api/user.js');
const apiRouterGetData = require('./api/get-data.js');
const apiRouterInventory = require('./api/inventory.js');
const apiRouterDashboard = require('./api/dashboard.js');

router.use('/api/auth', apiRouterAuth);
router.use('/api/user', apiRouterUser);
router.use('/api/get', apiRouterGetData);
router.use('/api/inventory', apiRouterInventory);
router.use('/api/dashboard', apiRouterDashboard);

module.exports = router;