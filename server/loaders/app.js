
const helmet = require('helmet');
const cors = require('cors');
const redisClient = require('./redis');
const logger = require('./logger');

module.exports = (express, app) => {

    console.log('Loading app...');

    const client = redisClient();

    const router = express.Router();

    const middlewares = [
        cors(),
        express.json(),
        express.urlencoded({ extended: false }),
        helmet(),
    ]

    if (process.env.NODE_ENV !== "test") {
        // logger imports 'morgan' logging library -- morgan intereferes with testing
        logger(app);
    }

    app.use(middlewares);

    app.use('/api', require('../api/routes/api')(router, client))

}