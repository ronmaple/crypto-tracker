import React from 'react';
import styled from 'styled-components';

// copied from: https://gist.github.com/knowbody/578b35164b69e867ed4913423f6bed30

const Spinner = () => (
	<Wrapper>
		<StyledSpinner viewBox="0 0 50 50">
			<circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
		</StyledSpinner>
	</Wrapper>
);
const Wrapper = styled.div`
	align-self: center;
`;
const StyledSpinner = styled.svg`
	animation: rotate 2s linear infinite;
	/* margin: -25px 0 0 -25px; */
	width: 100px;
	height: 100px;

	& .path {
		stroke: #5652bf;
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`;

export default Spinner;
