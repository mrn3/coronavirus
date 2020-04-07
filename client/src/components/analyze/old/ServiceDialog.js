import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import BaseDialog from './BaseDialog';
import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useMainContext } from "../MainContext";

const useStyles = makeStyles(theme => ({
	blockCenter: {
		padding: theme.spacing(2),
		textAlign: 'center'
	},
	buttonBar: {
		marginTop: 32,
		display: "flex",
		justifyContent: "center"
	},
	container: {
		maxWidth: 600,
		flexGrow: 1,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	formControl: {
		width: "100%"
	},
	sectionHeader: {
		textTransform: 'uppercase',
		marginBottom: 0,
		textAlign: 'left'
	},
	sectionText: {
		textAlign: 'left'
	},
	selector: {
		marginTop: 15
	},
	textField: {},
}));

export default function ServiceDialog(props) {
	const styles = useStyles();
	const {
		handleServiceSubmit,

		closeServiceDialog,

		currentServiceType,
		handleCurrentServiceTypeChange,

		currentServiceProviderName,
		handleCurrentServiceProviderNameChange,

		currentServiceProviderUrl,
		handleCurrentServiceProviderUrlChange,
		currentServiceProviderUrlInvalid,
		handleCurrentServiceProviderUrlBlur,

		currentServiceBillingPerMonth,
		handleCurrentServiceBillingPerMonthChange,
		currentServiceBillingPerMonthInvalid,
		handleCurrentServiceBillingPerMonthBlur,

		currentServiceStartedAt,
		handleCurrentServiceStartedAtChange,
		currentServiceStartedAtInvalid,
		handleCurrentServiceStartedAtBlur,

		currentServiceRating,
		handleCurrentServiceRatingChange,

	} = useMainContext();

	return (
		<BaseDialog {...props} title="Add Service">
			<form onSubmit={handleServiceSubmit}>
				<div className={styles.container}>
					<div style={{ marginBottom: 20 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Service
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<Select	                        
								className={styles.selector}	       
								value={currentServiceType}	
								onChange={handleCurrentServiceTypeChange}
								input={	   
									<OutlinedInput	    
										labelWidth={0}	
										name="currentServiceType"	
									/>	
								}
							>
								<MenuItem value=""><em>Select Service Type</em></MenuItem>
								<MenuItem value={'SEO'}>Search Engine Optimization (SEO)</MenuItem>
								<MenuItem value={'PPC'}>Pay Per Click (PPC)</MenuItem>
								<MenuItem value={'Design'}>Website Design</MenuItem>
								<MenuItem value={'Social'}>Social Media Marketing</MenuItem>
								<MenuItem value={'Email'}>Email Marketing</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div style={{ marginBottom: 32 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Provider Information
						</Typography>
						<Typography className={styles.sectionText} gutterBottom>
							Which provider (or agency) is currently providing 
							{
								currentServiceType
									? ` ${currentServiceType} `
									: ` this service `
							}
							to you?
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-service-name-input"
								label="Provider Name"
								className={styles.textField}
								name="currentServiceProviderName"
								value={currentServiceProviderName}
								onChange={handleCurrentServiceProviderNameChange}
								autoComplete="currentServiceProviderName"
								margin="normal"
								variant="outlined"
							/>
						</FormControl>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-service-url-input"
								label="Provider Website Address"
								className={styles.textField}
								type="currentServiceProviderUrl"
								name="currentServiceProviderUrl"
								value={currentServiceProviderUrl}
								onChange={handleCurrentServiceProviderUrlChange}
								onBlur={handleCurrentServiceProviderUrlBlur}
								autoComplete="currentServiceProviderUrl"
								margin="normal"
								variant="outlined"
								error={currentServiceProviderUrlInvalid}
								helperText={
									currentServiceProviderUrlInvalid
										? "Service Provider Website Address must be a valid URL (e.g., http://www.some-site.com)"
										: ""
								}
							/>
						</FormControl>
					</div>
					<div style={{ marginBottom: 32 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Billing Per Month
						</Typography>
						<Typography className={styles.sectionText} style={{ marginTop: 10 }} gutterBottom>
							How much does
							{
								currentServiceProviderName
									? ` ${currentServiceProviderName} `
									: ` this provider `
							}
							bill you per month for 
							{
								currentServiceType
									? ` ${currentServiceType} `
									: ` this service `
							}
							?
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-product-revenue-per-transaction-input"
								label="Billing Per Month"
								className={styles.textField}
								name="currentServiceBillingPerMonth"
								value={currentServiceBillingPerMonth}
								onChange={handleCurrentServiceBillingPerMonthChange}
								onBlur={handleCurrentServiceBillingPerMonthBlur}
								autoComplete="currentServiceBillingPerMonth"
								margin="normal"
								variant="outlined"
								error={currentServiceBillingPerMonthInvalid}
								helperText={
									currentServiceBillingPerMonthInvalid
										? "Revenue Per Transaction must be a number (e.g., 123000)"
										: ""
								}
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>
								}}
							/>
						</FormControl>
					</div>
					<div style={{ marginBottom: 32 }}>
						<Typography className={styles.sectionText} gutterBottom>
							When did you start your
							{
								currentServiceType
									? ` ${currentServiceType} `
									: ` this service `
							}
							campaign with
							{
								currentServiceProviderName
									? ` ${currentServiceProviderName} `
									: ` this provider `
							}
							?
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-service-started-at-input"
								label="Start Date"
								type="date"
								className={styles.textField}
								InputLabelProps={{
									shrink: true,
								}}
								name="currentServiceStartedAt"
								value={currentServiceStartedAt}
								onChange={handleCurrentServiceStartedAtChange}
								onBlur={handleCurrentServiceStartedAtBlur}
								autoComplete="currentServiceStartedAt"
								margin="normal"
								variant="outlined"
								error={currentServiceStartedAtInvalid}
								helperText={
									currentServiceStartedAtInvalid
										? "Start Date must be a valid date"
										: ""
								}
							/>
						</FormControl>
					</div>
					<div style={{ marginBottom: 32 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Rating
						</Typography>
						<Typography className={styles.sectionText} gutterBottom>
							How would you rate the performance of 
							{
								currentServiceProviderName
									? ` ${currentServiceProviderName} `
									: ` this provider `
							}
							for 
							{
								currentServiceType
									? ` ${currentServiceType} `
									: ` this service `
							}
							?
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<Rating
								name="service-rating-input"
								value={currentServiceRating}
								onChange={handleCurrentServiceRatingChange}
							/>
						</FormControl>
					</div>
				</div>
				<div className={styles.buttonBar}>
					<Button
						onClick={closeServiceDialog}
						className={styles.backButton}
						size="large"
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleServiceSubmit}
						size="large"
						disabled={
							(!currentServiceProviderName || currentServiceBillingPerMonthInvalid || currentServiceStartedAtInvalid)
						}
					>
						Save
					</Button>
				</div>
			</form>
		</BaseDialog>
	)
}