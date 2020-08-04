const _ = require('lodash');
const { coinApiKey } = require('../../configs/keys');
const moment = require('moment');

const requestHeaders = {
    headers: {
        'X-CoinAPI-Key': coinApiKey
    }
}

const baseUrl = 'https://rest.coinapi.io';

const arrayUnion = (arr1, arr2, identifier) => {
    /*
        @param {Array.<Object>} arr1  
        @param {Array.<Object>} arr2
        @param {string} - Specific Object key present in both array join at
    */
    const array = [...arr1, ...arr2];

    return _.uniqBy(array, identifier)
}

const timeToMidnight = () => {
    const endOfDay = moment().endOf('day');
    const minsToMidnight = (-1) * moment().diff(endOfDay, 'seconds');
    return minsToMidnight
}

module.exports = {
    requestHeaders,
    baseUrl,
    arrayUnion,
    timeToMidnight
}