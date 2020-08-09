import React, { useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../context/AppContext';

export default function Card({ data: { asset_id, name, price_cad, url, price_usd } }) {
	const { state } = useContext(AppContext);

	const formatPrice = (price) => {
		return price < 100 ? price.toFixed(3) : Math.round(price);
	};

	let price = state.isUSD ? `$ ${formatPrice(price_cad)} CAD` : `$ ${formatPrice(price_usd)} USD`;
	return (
		<Wrapper>
			<Header>
				<div>
					<h3>
						{name} ({asset_id})
					</h3>
				</div>
				<div>
					<Image src={url} />
				</div>
			</Header>
			<Body>
				<span>{price}</span>
			</Body>
		</Wrapper>
	);
}
const Wrapper = styled.div`
	height: 90%;
	width: 75%;
	box-shadow: ${(props) => props.theme.shadow};
	margin: auto;
	background: ${(props) => props.theme.colors.white};
	border-radius: 0.25em;
	position: relative;

	h3,
	span {
		font-family: ${(props) => props.theme.fonts[0]};
	}

	&:hover {
		transform: scale(1.05);
		transition: 0.4s;
	}
`;

const Header = styled.div`
	padding: 1em 1.25em;
	margin: auto;
	text-align: center;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	div {
		h3 {
			font-size: ${(props) => props.theme.fontSizes.small};
		}
	}
`;

const Image = styled.img`
	height: 1.5em;
	width: 1.5em;
`;

const Body = styled.div`
	height: 50%;
	padding: 0.25em 0.5em;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;

	span {
		font-size: ${(props) => props.theme.fontSizes.medium};
	}
`;

const Footer = styled.div`
	background: ${(props) => props.theme.colors.cadet};
	height: 0.1em;
`;
