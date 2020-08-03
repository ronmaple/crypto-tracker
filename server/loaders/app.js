
const helmet = require('helmet');
const cors = require('cors');

module.exports = (express, app) => {

    console.log('Loading app...');

    const router = express.Router();

    const middlewares = [
        cors(),
        express.json(),
        express.urlencoded({ extended: false }),
        helmet(),
    ]

    if (process.env.NODE_ENV !== "test") {
        // morgan interferes with tests

        const morgan = require('morgan');

        morgan.token("body", function (req, res) {
            return JSON.stringify(req.body);
        });

        const morganSettings =
            ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]";

        app.use(morgan(morganSettings));
    }

    app.use(middlewares);


}