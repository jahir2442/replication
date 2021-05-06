const jwt = require('jsonwebtoken');

const currentUser = ((req, res, next) => {
    const cookie = req.headers['set-cookie'][0].split('=')[1];
    if (cookie) {
        const payload = jwt.verify(cookie, 'key');
        req.currentUser = payload;
    }
    next();
});

module.exports = currentUser;