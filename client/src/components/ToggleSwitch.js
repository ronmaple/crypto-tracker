import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../context/AppContext';

export default function ToggleSwitch() {
	const { state, setAppContext } = useContext(AppContext);

	const toggle = (e) => {
		const tempState = { ...state };
		tempState.isUSD = e.target.checked;
		setAppContext(tempState);
	};

	return (
		<Wrapper>
			<SliderInput type="checkbox" onClick={toggle} />
			<Slider />
		</Wrapper>
	);
}

const Wrapper = styled.label`
	position: relative;
	display: inline-block;
	width: 2.2em;
	height: 1.2em;

	> input {
		display: none;
	}
`;

const Slider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background-color: #ddd;
	transition: 0.4s;
	border-radius: 1.1em;

	&:before {
		position: absolute;
		content: '';
		height: 1.1em;
		width: 1.1em;
		background: #999;
		transition: 0.2s;
		border-radius: 50%;
	}
`;

const SliderInput = styled.input`
	&:checked + ${Slider} {
		background-color: #0365b2;
		&:before {
			transform: translateX(1.1em);
			background-color: white;
		}
	}
`;
