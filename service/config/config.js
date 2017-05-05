//  config.js
//
//  Simple application configuration. Extend as needed.
var fs = require('fs');

module.exports = {
	port: process.env.PORT || 8123,
  db: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    database: 'trucraft',
    user: 'trucraft_service',
    password: fs.readFileSync(process.env.MYSQL_PASSWORD_FILE, 'utf8').trim(),
    port: 3306
  }
};
