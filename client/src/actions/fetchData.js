import axios from 'axios';

export default async () => {
    const data = await axios.get('http://localhost:5000/api/all');
    console.log('fetchData() axios invoked, axios result: ', data);
    return data;
}