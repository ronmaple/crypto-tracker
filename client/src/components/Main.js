import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

import fetchData from '../actions/fetchData';
import { initialState } from '../store/initialState';

export default function Main(props) {
    // const [state, setState] = useState(initialState)
    const { state, setAppContext } = useContext(AppContext);

    console.log('state', state);
    useEffect(() => {
        console.log('props', props)
        fetchData()
            .then(({ data: res }) => {
                // setState({
                //     loading: false,
                //     data: res
                // })

                console.log('res')
                setAppContext({
                    loading: false,
                    data: res
                })
            })
        return (() => {
            console.log('props', props);
        })
    }, [])

    return (
        <div>
            {
                state.isLoading ? <div>loading</div> :
                    state.data.map(data => <li>{data.asset_id}</li>)
            }
        </div>
    )
}