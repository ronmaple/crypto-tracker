const helmet = require('helmet');
const cors = require('cors');
const redisClient = require('./redis');
const logger = require('./logger');
const path = require('path');

module.exports = (express, app) => {
	console.log('Loading app...');

	const client = redisClient();

	const router = express.Router();

	const middlewares = [cors(), express.json(), express.urlencoded({ extended: false }), helmet()];

	if (process.env.NODE_ENV !== 'test') {
		// logger imports 'morgan' logging library -- morgan intereferes with testing
		logger(app);
	}

	app.use(middlewares);

	app.use('/api', require('../api/routes/api')(router, client));

	if (process.env.NODE_ENV === 'production') {
		const reactBuildPath = path.join(__dirname, '../../', 'client', 'build', 'index.html');
		const staticBuildPath = path.join(__dirname, '../../', 'client', 'build');

		app.use(express.static(staticBuildPath));
		app.use(express.static('public'));

		app.get('/', (req, res) => {
			res.sendFile(reactBuildPath);
		});
	}

	app.use((req, res, next) => {
		res.status(404).send('Not Found');
	});

	app.use((err, req, res, next) => {
		console.error(err.stack);
		res.status(500).send('Something broke!');
	});
};
