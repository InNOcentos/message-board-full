'use strict';

const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'localhost/messageBoard';
const db = monk(connectionString);

module.exports = db;
