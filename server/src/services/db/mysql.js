const mysql = require('mysql');

class MySQL {
     createConnection() {
          let connection = mysql.createConnection({
               user: process.env.DB_USER || 'root',
               password: process.env.DB_PASSWORD || 'root',
               host: process.env.DB_HOST || 'localhost',
               database: process.env.DB_DATABASE || 'rep_db'
          });

          return connection;
     }

     collect(spName, modelArray, data) {
          return new Promise((resolve, reject) => {
               let result = {
                    success: false,
                    noti: {
                         title: "Ocurrio un error al conectarte a la base de datos",
                         icon: "error"
                    }
               }
               try {
                    let connection = this.createConnection();
                    if (modelArray === undefined || data === undefined) {
                         connection.query(`CALL ${spName}()`, (err, response) => {
                              this.closeConnection(connection);
                              if (err) {
                                   console.log(err);
                                   return reject(result);
                              }
                              delete result.noti;
                              result.success = true;
                              result.data = response;
                              resolve(result);
                         });
                    } else {
                         let dataKeys = Object.keys(data);

                         for (let row of modelArray) {
                              let ifKeyExists = dataKeys.find(key => key == row);
                              if (!ifKeyExists)
                                   return reject(`El objecto ${row} no existe en el modelo`)
                         }

                         let orderdata = modelArray.map(row => data[row].toString());
                         spName += modelArray.reduce((acc, current, index) => {
                              acc += index + 1 === modelArray.length ? '?)' : '?,'
                              return acc;
                         }, '(');
                         connection.query(`CALL ${spName}`, orderdata, (err, response) => {
                              this.closeConnection(connection);
                              if (err) {
                                   console.log(err);
                                   return reject(result);
                              }
                              delete result.noti;
                              result.success = true;
                              result.data = response;
                              resolve(result);
                         });
                    }

               } catch (ex) {
                    console.log("MYSQL COLLECTOR: ", ex);
                    reject(result)
               }
          });
     }

     closeConnection(connection) {
          connection.end();
     }
}

module.exports = new MySQL();