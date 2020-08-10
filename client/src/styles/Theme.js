import React from 'react';
import { ThemeProvider } from 'styled-components';

const Theme = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const theme = {
	colors: {
		aliceBlue: '#F4FAFF',
		platinum: '#DEE7E7',
		blueBell: '#B7ADCF',
		cadet: '#4F646F',
		grey: '#535657',
		white: 'white',
	},
	fonts: ['Roboto', 'sans-serif'],
	fontSizes: {
		small: '1rem',
		medium: '2rem',
		large: '3rem',
	},
	breakpoints: {
		xxxs: 400,
		xxs: 500,
		xs: 600,
		xsm: 750,
		sm: 960,
		md: 1280,
		lg: 1960,
	},
	shadow: '0 0 .25rem 0 #535657',
	shadowHover: '0 0 0.5rem 0 #535657',
};

export default Theme;
