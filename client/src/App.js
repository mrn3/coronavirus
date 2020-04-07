import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors';
import { useMainContext } from "./components/MainContext";

const theme = createMuiTheme({
	palette: {
		secondary: {
			main: blue[900]
		},
		primary: {
			main: indigo[700]
		}
	},
	typography: {
		useNextVariants: true,
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'"Lato"',
			'sans-serif'
		].join(',')
	}
});

export default function App() {
	return (
		<useMainContext.Provider>
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
		</useMainContext.Provider>
	);
}