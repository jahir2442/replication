const router = require('express').Router();
const currentUser = require('../../middleware/current-user');
const MySQL = new require('../../services/db/mysql');

router.get('/allPaquetes', currentUser, async (req, res) => {
     try {
          let responseDB = await MySQL.collect('get_paquetes');
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true, data: responseDB.data[1] });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

router.get('/paquete', currentUser, async (req, res) => {
     try {
          let responseDB = await MySQL.collect('get_paquete', ['id'], req.query);
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true, data: responseDB.data[1][0] });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

router.delete('/paquete', currentUser, async (req, res) => {
     try {
          let responseDB = await MySQL.collect(
               'delete_paquete',
               ['id_paquete'],
               req.body
          );
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

router.post('/paquete', async (req, res) => {
     try {
          let data = req.body;
          data.fecha_ini = new Date();
          let responseDB = await MySQL.collect(
               'create_paquete',
               [
                    'tracking',
                    'description',
                    'volume',
                    'fecha_ini',
                    'almacen_position',
                    'client',
                    'sucursal',
               ],
               data
          );
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

router.patch('/paquete', async (req, res) => {
     try {
          let data = req.body;
          let responseDB = await MySQL.collect(
               'update_paquete',
               [
                    'id',
                    'tracking',
                    'description',
                    'volume',
                    'status_paquete',
                    'almacen_position',
                    'client',
                    'sucursal',
               ],
               data
          );
          if (responseDB.data[0][0]._message == 0)
               return res.status(200).send({ success: false });
          res.send({ success: true });
     } catch (error) {
          console.log(error)
          return res.send({ success: false });
     }
});

module.exports = router;