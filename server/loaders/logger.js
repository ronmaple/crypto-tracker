module.exports = (app) => {
    console.log('logger.js loading initiated...')

    const morgan = require('morgan');

    morgan.token("body", function (req, res) {
        return JSON.stringify(req.body);
    });

    const morganSettings =
        ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]";

    app.use(morgan(morganSettings));

}