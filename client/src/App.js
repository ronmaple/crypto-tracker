import React, { useReducer, useState } from 'react';
import AppContext from './context/AppContext';

import { initialState } from './store/initialState';

import Main from './components/Main';

import Theme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';
import './App.css';

import { Reset } from 'styled-reset';

function App() {
	const [state, setState] = useState(initialState);

	const setContext = (data) => {
		setState(data);
	};

	return (
		<AppContext.Provider value={{ state, setAppContext: setContext }}>
			<Reset />
			<GlobalStyle />
			<Theme>
				<Container>
					<Main />
				</Container>
			</Theme>
		</AppContext.Provider>
	);
}

const Container = styled.main`
	display: flex;
	position: relative;
	background: ${(props) => props.theme.colors.aliceBlue};
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100wh;
`;

export default App;
