const router = require('express').Router();
const Password = require('../../services/password');
const MySQL = new require('../../services/db/mysql');
const jwt = require('jsonwebtoken');
router.post('/login', async (req, res) => {
    let responseDB = await MySQL.collect(
        'getUser',
        ['email'],
        req.body
    );
    if (responseDB.data[0][0]._message == 0)
        return res.status(200).send({ success: false });

    let userData = responseDB.data[1][0];
    const passwordMath = await Password.compare(
        userData.password,
        req.body.password
    );

    if (!passwordMath)
        return res.status(200).send({ success: false });

    // Generate JWT
    delete userData.password;
    const userJwt = jwt.sign(
        { userData },
        process.env.JWT_KEY || 'key'
    );

    // strore on session object
    req.session = {
        jwt: userJwt,
    };

    res.status(200).send({ success: true, jwt: userJwt });
});

module.exports = router;