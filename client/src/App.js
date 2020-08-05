import React, { useReducer, useState } from 'react';
import AppContext from './context/AppContext';
import Main from './components/Main'
import { initialState } from './store/initialState';
import useFetchData from './hooks/useFetchData';

import './App.css';

import { Reset } from 'styled-reset';

function App() {

  const [state, setState] = useState(initialState);

  const setContext = (data) => {
    setState(data);
  }

  return (
    <AppContext.Provider value={{ state, setAppContext: setContext }}>
      <Reset />
      <Main />
    </AppContext.Provider >
  );
}

export default App;
