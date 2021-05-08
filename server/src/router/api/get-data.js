const router = require('express').Router();
const currentUser = require('../../middleware/current-user');
const MySQL = new require('../../services/db/mysql');

router.get('/almacen', currentUser, async (req, res) => {
     try {
          let responseDB = await MySQL.collect('get_position_almacen');
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true, data: responseDB.data[1] });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

router.get('/clients', currentUser, async (req, res) => {
     try {
          let responseDB = await MySQL.collect('get_clients');
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true, data: responseDB.data[1] });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

router.get('/sucursal', currentUser, async (req, res) => {
     try {
          let responseDB = await MySQL.collect('get_sucursal');
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true, data: responseDB.data[1] });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

router.get('/status-paquete', currentUser, async (req, res) => {
     try {
          let responseDB = await MySQL.collect('get_status_paquetes');
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true, data: responseDB.data[1] });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

module.exports = router;