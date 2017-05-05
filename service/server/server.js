//  server.js

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports.start = (options) => {

	return new Promise((resolve, reject) => {

		//  Make sure we have a repository and port provided.
		if(!options.repository) throw new Error("A server must be started with a connected repository.");
		if(!options.port) throw new Error("A server must be started with a port.");

		var app = express();

		//  Create the app, add some logging.
		app.use(morgan('dev'));

		// Configure express to use body-parser as middle-ware.
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());

		//  Add the APIs to the app.
		require('../api/backpack')(app, options);

		//  Start the app, creating a running server which we return.
		var server = app.listen(options.port, () => {
			resolve(server);
		});

	});
};