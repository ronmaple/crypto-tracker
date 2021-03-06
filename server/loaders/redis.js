const redis = require('redis');

module.exports = () => {
	try {
		console.log('Loading Redis...');

		const DEFAULT_LOCAL_PORT = 6379;

		const REDIS_PORT = process.env.REDIS_URL || DEFAULT_LOCAL_PORT;

		const redisClient = redis.createClient(REDIS_PORT);

		console.log(`...successfully loaded Redis on port: ${REDIS_PORT}`);

		return redisClient;
	} catch (e) {
		console.log('...failed to load Redis...');
	}
};
