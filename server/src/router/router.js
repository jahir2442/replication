const router = require('express').Router();
const apiRouterAuth = require('./api/auth.js');
const apiRouterUser = require('./api/user.js');
const apiRouterGetData = require('./api/get-data.js');
const apiRouterInventory = require('./api/inventory.js');

router.use('/api/auth', apiRouterAuth);
router.use('/api/user', apiRouterUser);
router.use('/api/get', apiRouterGetData);
router.use('/api/inventory', apiRouterInventory);

module.exports = router;