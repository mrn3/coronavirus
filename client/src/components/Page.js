import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from './TopBar';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import Background from '../images/png/background.png';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh'
	},
	grid: {
		width: 1200,
		marginTop: 40,
		[theme.breakpoints.down('sm')]: {
			width: 'calc(100% - 20px)'
		}
	},
	content: {
		padding: theme.spacing(3),
		textAlign: 'left',
		margin: 'auto',
		color: theme.palette.text.secondary,
	},
	backgroundGraphic: {
		backgroundImage: `url(${Background})`,
		width: '100%',
		height: 700
	}
}));

export default function Page(props) {
	const styles = useStyles();
	let contentWidth = props.contentWidth || 900;
	let contentBackgroundColor = props.contentBackgroundColor || '#fff';
    return (
        <div className={styles.root} style={{backgroundColor: contentBackgroundColor}}>
			<CssBaseline />
            <TopBar currentPath={props.currentPath} />
			<Grid container spacing={0}>
				<div style={{width: contentWidth}} className={styles.content}>
					{props.children}
				</div>
            </Grid>
			{
				props.includeBackgroundGraphic
				? <div className={styles.backgroundGraphic} />
				: <div><br /><br /></div>
			}
            <Footer />
        </div>
    )
}