const router = require('express').Router();
const Password = require('../../services/password');
const MySQL = new require('../../services/db/mysql');
const jwt = require('jsonwebtoken');

router.get('/currentUser', async (req, res) => {
    console.log("currentUser", req.session.jwt);
    res.status(200).send({ success: true });
})

module.exports = router;