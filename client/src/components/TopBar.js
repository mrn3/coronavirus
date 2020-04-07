import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Menu from './Menu';

import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const logo = require('../images/png/background.png');

const useStyles = makeStyles(theme => ({
	appBar: {
		boxShadow: 'none',
		backgroundColor: 'white',
		borderBottom: `1px solid ${theme.palette.grey['A100']}`,
	},
	flex: {
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			justifyContent: 'space-evenly',
			alignItems: 'center'
		}
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	},
	logo: {
		width: 160
	},
	logoContainer: {
		padding: 14
	},
	iconContainer: {
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'block'
		}
	},
	iconButton: {
		float: 'right'
	},
	tabContainer: {
		margin: 'auto',
		paddingRight: 150,
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	tabItem: {
		minWidth: 'auto'
	}
}));

export default function TopBar(props) {
	const classes = useStyles();
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);
	const [menuDrawer, setMenuDrawer] = useState(false);

	const handleTabChange = (event, value) => {
		setSelectedTabIndex(value);
	};

	const mobileMenuOpen = (event) => {
		setMenuDrawer(true);
	};

	const mobileMenuClose = (event) => {
		setMenuDrawer(false);
	};

	const getCurrentParentPage = () => {
		let filteredArray = Menu.map((item, index) => {
			let currentPathParentPage = props.currentPath.split('/')[1];
			let itemPathParentPage = item.pathname.split('/')[1];
			if (currentPathParentPage === itemPathParentPage) {
				return index;
			} else {
				return 0;
			}
		});
		return Math.max(...filteredArray);
	};

	return (
		<AppBar position="relative" color="default" className={classes.appBar}>
			<Toolbar>
				<Grid container spacing={0} alignItems="baseline">
					<Grid container item xs={12} className={classes.flex} alignItems="baseline">
						<Link to='/' className={classes.link}>
							<div className={classes.logoContainer}>
								<img className={classes.logo} src={logo} alt="Coronavirus Stats Logo" />
							</div>
						</Link>
						{!props.noTabs && (
							<React.Fragment>
								<div className={classes.iconContainer}>
									<IconButton onClick={mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
										<MenuIcon />
									</IconButton>
								</div>
								<div className={classes.tabContainer}>
									<SwipeableDrawer anchor="right" open={menuDrawer} onOpen={mobileMenuOpen} onClose={mobileMenuClose}>
										<AppBar title="Menu" />
										<List>
											{
												Menu.map((item, index) => {
													return (
														<ListItem
															component={Link}
															to={{
																pathname: item.pathname,
																search: props.currentPath
															}}
															button key={index}>
															<ListItemText primary={item.label} />
														</ListItem>
													)
												})
											}
										</List>
									</SwipeableDrawer>
									<Tabs
										value={getCurrentParentPage() || selectedTabIndex}
										indicatorColor="primary"
										textColor="primary"
										onChange={handleTabChange}
									>
										{
											Menu.map((item, index) => {
												return (
													<Tab key={index} component={Link}
														to={{ pathname: item.pathname }}	//search: props.currentPath
														styles={{ root: classes.tabItem }} label={item.label} />
												)
											})
										}
									</Tabs>
								</div>
							</React.Fragment>
						)}
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}