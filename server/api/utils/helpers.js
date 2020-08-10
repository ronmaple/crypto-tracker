const { coinAPI } = require('../../configs/keys');
const _ = require('lodash');
const moment = require('moment');

const requestHeaders = {
	headers: {
		'X-CoinAPI-Key': coinAPI,
	},
};

const baseUrl = 'https://rest.coinapi.io';

const arrayUnion = (arr1, arr2, identifier) => {
	/*
        @param {Array.<Object>} arr1  
        @param {Array.<Object>} arr2
        @param {string} - Specific Object key present in both array join at
    */

	const merged = _.merge(_.keyBy(arr1, identifier), _.keyBy(arr2, identifier));
	const values = _.values(merged);

	return values;
};

const timeToMidnight = () => {
	const endOfDay = moment().endOf('day');
	const minsToMidnight = -1 * moment().diff(endOfDay, 'seconds');
	return minsToMidnight;
};

module.exports = {
	requestHeaders,
	baseUrl,
	arrayUnion,
	timeToMidnight,
};
