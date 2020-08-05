import { useEffect, useState } from 'react';
import { initialState } from '../store/initialState';
import fetchData from '../actions/fetchData';

export default () => {
    const { state, setState } = useState()
    useEffect(() => {
        fetchData()
            .then(res => {
                setState({
                    loading: false,
                    data: res
                })
            })
    }).catch(err => console.error(err));
}