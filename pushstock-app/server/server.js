// Get dependencies
const express = require('express');
const app = express();
//const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get our API routes
const main_router = require('./config/urls');

// URLs
app.use('/', main_router);

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cross Origin middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Connect to DB (mongodb = name of mongo container)
// database is name of link in docker-compose to database service
// pushstock-app is root directory of project
const dbHost = 'mongodb://database/pushstock-app'
mongoose.connect(dbHost);

// Create HTTP Server
const server = http.createServer(app);
// Listen on provied port, on all network interfaces
server.listen(port, () => console.log('API running on localhost:' + port));