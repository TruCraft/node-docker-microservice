//  backpack.js
//
//  Defines the backpack api. Add to a server by calling:
//  require('./backpack')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

	app.get('/backpack', (req, res, next) => {
		options.repository.getBackpack().then((backpacks) => {
			res.status(200).send(backpacks.map((backpack) => {
				return backpack;
			}));
		})
			.catch(next);
	});

	app.get('/backpack/search', (req, res, next) => {
		let username = req.query.username;
		if(!username) {
			throw new Error("When searching for a backpack, the username must be specified.");
		}

		let limit = null;
		if(req.query.limit) {
			limit = req.query.limit;
		}

		// Get the backpack from the repo.
		options.repository.getBackpackByUsername(username, limit).then((backpack) => {

			if(!backpack) {
				res.status(404).send('Backpack not found for user ' + username + '.');
			} else {
				res.status(200).send(backpack);
			}
		})
			.catch(next);

	});

	app.post('/backpack/add', (req, res) => {
		let username = req.body.username;
		if(!username) {
			throw new Error("When adding backpack, the username must be specified.");
		}

		let backpack = req.body.backpack;

		// Add backpack to the repo
		options.repository.addBackpack(username, backpack).then((ret) => {

			if(!ret) {
				res.status(404).send('Backpack not added for user ' + username + '.');
			} else {
				let response = {"ret": ret, hostname: process.env.HOSTNAME}
				res.status(200).send(response);
			}
		})
			.catch();

	});

};
