const router = require('express').Router();
const apiRouterAuth = require('./api/auth.js');

router.use('/api/auth', apiRouterAuth);

module.exports = router;