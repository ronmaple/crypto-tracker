import axios from 'axios';

export default async () => {
	const data = await axios.get('/api/all');
	return data;
};
