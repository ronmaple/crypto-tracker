// const setCache = require('../middleware/setCache');
const getSpecificData = require('../utils/getSpecificData');
const getListData = require('../utils/getListData');
const moment = require('moment');
const _ = require('lodash');
const { timeToMidnight } = require('../utils/helpers');

module.exports = (router, client) => {

    const EXPIRE_1HR = 3600;

    // TODO: maybe a single cache is fine... check express url if '/all' or '/single'?
    const cacheSingle = ({ body: { base, currency } }, res, next) => {
        console.log('cacheSingle...')

        const key = JSON.stringify({
            base: base.toUpperCase(),
            currency: currency.toUpperCase()
        })

        return saveToCache(res, next, client, key);
    }

    const cacheAll = (req, res, next) => {
        console.log('cacheAll...');

        // set cache key as current date. Other possibilities are per hour. 
        const currentDate = moment().format('YYYYMMDD');
        const key = currentDate;

        return saveToCache(res, next, client, key);
    }

    const saveToCache = (res, next, client, key) => {
        client.get(key, (err, data) => {
            if (err) throw err;

            if (data !== null) {
                const response = JSON.parse(data);
                return res.json(response);
            } else {
                next();
            }
        })
    }

    router.get('/single', cacheSingle, async (req, res, next) => {
        try {
            console.log('Fetching data...');

            let { body: { base, currency } } = req;

            base = base.toUpperCase();
            currency = currency.toUpperCase();

            const key = JSON.stringify({ base, currency })

            const data = await getSpecificData(base, currency);

            const dataJson = JSON.stringify(data);

            client.setex(key, EXPIRE_1HR, dataJson);

            res.json(data);

        } catch (e) {
            console.error(e);
            res.status(500).send({ error: 'Server error' })
        }
    })

    router.get('/all', cacheAll, async (req, res, next) => {
        const currencies = await getListData();

        console.log('currencies', currencies);

        // currently price to disaply is CAD. this can probably be done on the front end too
        // for multi-conversion, but unnecessary for this app. 

        const { price_usd: cad_usd } = _.find(currencies, ({ asset_id }) => asset_id === 'CAD');

        currencies.forEach((currency) => {
            currency.price_cad = currency.price_usd / cad_usd;
        })

        const realCurrencies = ['CAD', 'USD']

        const response = currencies.filter(({ asset_id }) => !realCurrencies.includes(asset_id))

        const key = moment().format('YYYYMMDD');

        const EXPIRATION = timeToMidnight();

        client.setex(key, EXPIRATION, JSON.stringify(response));

        res.json(response);
    })

    router.post('/add', async (req, res, next) => {
        // ADD new Crypto to the list
    })


    return router;


}