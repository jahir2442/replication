const jwt = require('jsonwebtoken');

const currentUser = ((req, res, next) => {
     try {
          const cookie = req.headers['set-cookie'][0].split('=')[1];
          if (cookie) {
               const payload = jwt.verify(cookie, 'key');
               req.currentUser = payload;
          }
     } catch (error) {
          console.log(error)
          req.currentUser;
     }
     next();
});

module.exports = currentUser;