const axios = require('axios');
const moment = require('moment');
const { coinApiKey } = require('../../configs/keys');

async function getData() {
    console.log('getData invoked');
    const baseUrl = 'https://rest.coinapi.io/v1/exchangerate';

    // TODO accept these as params;
    let crypto = 'BTC';
    let currency = 'CAD';
    let time = moment().utc().format();

    const url = `${baseUrl}/${crypto}/${currency}?time=${time}`
    const headers = {
        headers: {
            'X-CoinAPI-Key': coinApiKey
        }
    }

    try {
        const { data } = await axios.get(url, headers);
        return data;
    } catch (e) {
        throw err;
    }

}

module.exports = getData;