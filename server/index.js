const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { json } = require('body-parser');
const router = require('./src/router/router.js');
const cookieSession = require('cookie-session');

const app = express();
app.use(cors());
app.use(json());
app.use(
    cookieSession({
        signed: false
    })
);

const server = http.createServer(app);
const port = process.env.PORT || 4000;

app.use('/', router);

server.listen(port, () => {
    console.log('SERVER RUNNING IN ' + port);
});