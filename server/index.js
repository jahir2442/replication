const express = require('express');
const http = require('http');
const path = require('path');

// const router = require('./src/router/router.js');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

// app.use('/', router);

app.get('/api/prueba', (req, res) => {
    res.status(200).send("HOLA")
})

server.listen(port, () => {
    console.log('SERVER RUNNING IN ' + port);
});