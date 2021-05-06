const router = require('express').Router();
const currentUser = require('../../middleware/current-user');


router.get('/currentUser', currentUser, async (req, res) => {
    console.log(req.currentUser);
    res.send({ currentUser: req.currentUser });
})

module.exports = router;