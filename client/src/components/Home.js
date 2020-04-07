import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Page from './Page';
import { useMainContext } from "./MainContext";

const useStyles = makeStyles(theme => ({
	row: {
		display: 'flex',
	},
	actionButton: {
		float: 'right',
		textTransform: 'uppercase',
		margin: theme.spacing(1),
		width: 152
	},
	blockCenter: {
		padding: theme.spacing(2),
		textAlign: 'center'
	},
	block: {
		padding: theme.spacing(2),
	},
	inlining: {
		display: 'inline-block',
		marginRight: 10
	},
	buttonBar: {
		display: 'flex'
	},
	alignRight: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	formControl: {
		float: 'left',
		width: "100%"
	},
	noBorder: {
		borderBottomStyle: 'hidden'
	},
	loadingState: {
		opacity: 0.05
	},
	loadingMessage: {
		position: 'absolute',
		top: '40%',
		left: '40%'
	},
	title: {
		fontFamily: 'Arial Narrow',
		fontSize: 56,
		fontWeight: 900,
		color: '#E66464',
		textTransform: 'uppercase'
	},
	subtitle: {
		fontSize: 24,
		color: '#444',
		padding: 20
	}
}));

export default function Home(props) {
	const currentPath = props.location.pathname;
	const styles = useStyles();
	const { 
		url, 
		handleUrlChange, 
		urlInvalid, 
		handleUrlBlur 
	} = useMainContext();

	const goToAnalyze = (event) => {
		props.history.push("/analyze/business");
	};

	return (
		<Page currentPath={currentPath} contentWidth={700} includeBackgroundGraphic={true}>
			<div className={styles.smallContainer}>
				<div className={styles.blockCenter}>
					<div className={styles.title}>
						54% of SEO Campaigns Lose Money
					</div>
					<div className={styles.subtitle}>
						We help small business owners quickly discover if their
						existing SEO campaigns have a positive ROI
					</div>
					<div className={styles.row}>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-url-input"
								label="Enter Your Website Address"
								className={styles.textField}
								type="url"
								name="url"
								value={url}
								onChange={handleUrlChange}
								onBlur={handleUrlBlur}
								autoComplete="url"
								margin="normal"
								variant="outlined"
								error={urlInvalid}
								helperText={
									urlInvalid
										? "Website Address must be a valid URL (e.g., http://www.some-site.com)"
										: ""
								}
							/>
						</FormControl>
						<Button
							variant="contained"
							color="primary"
							onClick={goToAnalyze}
							className={styles.actionButton}
							disabled={!url || urlInvalid}
						>
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</Page>
	)
}