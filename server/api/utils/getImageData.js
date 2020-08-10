const axios = require('axios');
const moment = require('moment');
const { baseUrl, requestHeaders } = require('../utils/helpers');
const defaults = require('../settings/defaultList.json');

async function getImagedata() {
	console.log('getImageData()...');

	const IMAGE_SIZE = '50';

	const { data: images } = await axios.get(`${baseUrl}/v1/assets/icons/${IMAGE_SIZE}`, requestHeaders);

	const filteredImages = images.filter((item) => {
		return defaults.some(({ name }) => {
			return name === item.asset_id;
		});
	});

	return filteredImages;
}

module.exports = getImagedata;
