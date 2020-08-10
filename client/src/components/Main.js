import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import fetchData from '../actions/fetchData';

import styled from 'styled-components';
import Card from './Card';
import ToggleSwitch from './ToggleSwitch';
import Spinner from '../components/Spinner';

export default function Main() {
	const { state, setAppContext } = useContext(AppContext);

	useEffect(() => {
		fetchData().then(({ data: res }) => {
			setAppContext({
				loading: false,
				data: res,
			});
		});
	}, []);

	return (
		<Container>
			<Title>
				<h1>Top Crypto Prices</h1>
			</Title>
			{state.isLoading ? (
				<>
					<LoadingWrapper>
						<Spinner />
					</LoadingWrapper>
				</>
			) : (
				<>
					<SwitchContainer>
						<CurrencyTag>USD</CurrencyTag>
						<ToggleSwitch />
						<CurrencyTag>CAD</CurrencyTag>
					</SwitchContainer>
					{state.data.map((data) => (
						<Card data={data} />
					))}
				</>
			)}
		</Container>
	);
}

const Container = styled.div`
	height: 90%;
	width: 90%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 5em 3em auto;
	grid-gap: 1em;

	/* > div {
		display: flex;
		justify-content: center;
		align-items: center;
	} */
`;

const Title = styled.div`
	grid-area: 1 / 1 / 2 / -1;
	background: ${(props) => props.theme.colors.cadet};
	box-shadow: ${(props) => props.theme.shadow};
	border-radius: 0.5em;
	display: flex;
	justify-content: center;
	align-items: center;

	h1 {
		font-size: ${(props) => props.theme.fontSizes.large};
		font-family: ${(props) => props.theme.fonts[0]};
		color: ${(props) => props.theme.colors.platinum};
	}
`;

const SwitchContainer = styled.div`
	grid-area: 2 / 1 / 3 / -1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CurrencyTag = styled.h3`
	font-size: ${(props) => props.theme.fontSizes.medium};
	font-family: ${(props) => props.theme.fonts[0]};
	padding: 0.75em;
`;

const LoadingWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	grid-area: 2 / 1 / -1 / -1;
`;
