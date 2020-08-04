const axios = require('axios');
const moment = require('moment');
const { coinApiKey } = require('../../configs/keys');

async function getSpecificData(crypto = 'BTC', currency = 'CAD', time = moment().utc().format()) {
    /*
        @param {string}  [crypto=BTC] - Cryptocurrency to be requested
        @param {string} [currency=CAD] - Real currency conversion for crypto
        @params {date} [time=Date.now] - Specified time for currency
    */

    console.log('getData params, crypto, currency, time: ', crypto, currency, time)

    const baseUrl = 'https://rest.coinapi.io/v1/exchangerate';

    const url = `${baseUrl}/${crypto}/${currency}?time=${time}`
    const headers = {
        headers: {
            'X-CoinAPI-Key': coinApiKey
        }
    }

    try {
        const { data: { asset_id_quote: currency, asset_id_base: crypto, rate } } = await axios.get(url, headers);

        const response = {
            currency,
            crypto,
            rate
        }

        return response;
    } catch (e) {
        return null;
    }

}

module.exports = getSpecificData;