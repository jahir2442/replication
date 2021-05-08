const router = require('express').Router();
const currentUser = require('../../middleware/current-user');
const MySQL = new require('../../services/db/mysql');

router.get('/get-data', currentUser, async (req, res) => {
     try {
          let responseDB = await MySQL.collect('data_dashboard');
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true, data: responseDB.data });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

module.exports = router;