const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { json } = require('body-parser');
const router = require('./src/router/router.js');
const cookieSession = require('cookie-session');
require('dotenv').config()

const app = express();
app.set('trust proxy', 1);
app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader(
          'Access-Control-Allow-Headers',
          '*'
     );
     res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, PUT, DELETE, OPTIONS'
     );
     next();
});
app.use(json());
app.use(
     cookieSession({
          signed: false,
          httpOnly: false,
          secure: false,
          domain: 'localhost:3000'
     })
);

const server = http.createServer(app);
const port = process.env.PORT || 4000;

app.use('/', router);

server.listen(port, () => {
     console.log('SERVER RUNNING IN ' + port);
});