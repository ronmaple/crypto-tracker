const axios = require('axios');
const moment = require('moment');
const { baseUrl, requestHeaders, arrayUnion } = require('../utils/helpers');
const getImages = require('./getImageData');
const _ = require('lodash');

// contains cryptocurrencies to be tracked. Also includes CAD and USD, for CAD-USD conversion
const defaults = require('../settings/defaultList.json');

async function getListData() {

    const KEY = 'asset_id';

    console.log('getListData()...')

    const { data } = await axios.get(`${baseUrl}/v1/assets`, requestHeaders);

    const filteredByCurrency = data.filter(item => {
        return defaults.some(({ name }) => {
            return name === item.asset_id;
        })
    })

    const filteredByKeys = filteredByCurrency.map(currency => {
        const allowedKeys = ['asset_id', 'name', 'price_usd']
        return Object.keys(currency)
            .filter(key => allowedKeys.includes(key))
            .reduce((obj, key) => {
                obj[key] = currency[key];
                return obj;
            }, {})
    })

    console.log('fitleredByKeys', filteredByKeys);

    const images = await getImages();

    const dataWithImages = arrayUnion(filteredByKeys, images, KEY);

    console.log('images', images);

    console.log('dataWithImages', dataWithImages);

    return dataWithImages;

}

getListData();


module.exports = getListData;
