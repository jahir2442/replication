const router = require('express').Router();
const apiRouterAuth = require('./api/auth.js');
const apiRouterUser = require('./api/user.js');

router.use('/api/auth', apiRouterAuth);
router.use('/api/user', apiRouterUser);

module.exports = router;