const express = require('express');
const app = express();

require('./loaders/app')(express, app);

let port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log(`App running on port: ${port}`);
});

module.exports = server; // for tests later.
