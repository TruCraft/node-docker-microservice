//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mysql = require('mysql');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
	constructor(connectionSettings) {
		this.connectionSettings = connectionSettings;
		this.connection = mysql.createConnection(this.connectionSettings);
	}
	
	getBackpack() {
		return new Promise((resolve, reject) => {

			this.connection.query('SELECT * FROM tf2_backpacks ORDER BY timestamp DESC', (err, results) => {
				if(err) {
					this.connection = mysql.createConnection(this.connectionSettings);
					return reject(new Error('An error occurred getting the backpack: ' + err));
				}

				resolve((results || []).map((backpack) => {
					return this.getBackpackObject(backpack);
				}));
			});

		});
	}

	getBackpackByUsername(username, limit = null) {

		return new Promise((resolve, reject) => {

			let limit_string = "";
			if(limit !== null) {
				limit_string = " LIMIT " + limit;
			}

			this.connection.query("SELECT * FROM tf2_backpacks WHERE username = ? ORDER BY timestamp DESC" + limit_string, [username], (err, results) => {

				if(err) {
					return reject(new Error('An error occurred getting the backpack for username ' + username + ': ' + err));
				}

				if(results.length === 0) {
					resolve(undefined);
				} else {
					resolve((results || []).map((backpack) => {
						return this.getBackpackObject(backpack);
					}));
				}

			});

		});
	}

	getBackpackObject(backpack) {
		if(!backpack) {
			return undefined;
		} else {
			return {
				username: backpack.username,
				timestamp: backpack.timestamp,
				backpack_json: backpack.backpack_json
			};
		}
	}

	addBackpack(username, backpack) {

		return new Promise((resolve, reject) => {

			this.connection.query("INSERT INTO tf2_backpacks VALUES (null, ?, now(), ?)", [username, backpack], (err, results) => {

				if(err) {
					return reject(new Error('An error occurred adding the backpack for username ' + username + ': ' + err));
				} else {
					resolve(true);
				}

			});

		});
	}

	disconnect() {
		this.connection.end();
	}
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
	return new Promise((resolve, reject) => {
		if(!connectionSettings.host) throw new Error("A host must be specified.");
		if(!connectionSettings.user) throw new Error("A user must be specified.");
		if(!connectionSettings.password) throw new Error("A password must be specified.");
		if(!connectionSettings.port) throw new Error("A port must be specified.");

		resolve(new Repository(connectionSettings));
	});
};
