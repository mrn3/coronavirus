import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import BaseDialog from './BaseDialog';
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Slider from '@material-ui/core/Slider';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useMainContext } from "../MainContext";

import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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

export default function RevenueDialog(props) {
    const styles = useStyles();
	const { 
		productArray,
		currentProductIndex,
		handleProductSubmit,

		closeRevenueDialog,
		
		currentProductName,
		handleCurrentProductNameChange,

		currentProductPercentage,
		handleCurrentProductPercentageChange,

		currentProductRevenuePerTransaction,
		handleCurrentProductRevenuePerTransactionChange,
		currentProductRevenuePerTransactionInvalid,
		handleCurrentProductRevenuePerTransactionBlur,

		currentProductProfitMargin,
		handleCurrentProductProfitMarginChange,
		currentProductProfitMarginInvalid,
		handleCurrentProductProfitMarginBlur,

		currentProductQuantitySold,
		handleCurrentProductQuantitySoldChange,
		currentProductQuantitySoldInvalid,
		handleCurrentProductQuantitySoldBlur,
		
		currentProductCustomerType,
		handleCurrentProductCustomerTypeChange,
		
		currentProductPurchaseTimes,
		handleCurrentProductPurchaseTimesChange,
		
		currentProductPurchaseInterval,
		handleCurrentProductPurchaseIntervalChange,
		
	} = useMainContext();

	const getPercentageMax = () => {
		let totalUsedPercentage = 0;
		let product;
		for (product of productArray) {
			totalUsedPercentage += product.percentage;
		}
		if (currentProductIndex >= 0) {	//if we are in edit mode, add current value
			return (100 - totalUsedPercentage + productArray[currentProductIndex].percentage);
		} else {
			return (100 - totalUsedPercentage);
		}
	}

	return (
		<BaseDialog {...props} title="Add Product/Service">
			<form onSubmit={handleProductSubmit}>
				<div className={styles.container}>
					<div style={{ marginBottom: 32 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							General Information
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-product-name-input"
								label="Product/Service Name"
								className={styles.textField}
								name="currentProductName"
								value={currentProductName}
								onChange={handleCurrentProductNameChange}
								autoComplete="currentProductName"
								margin="normal"
								variant="outlined"
							/>
						</FormControl>
					</div>
					<div style={{ marginBottom: 32 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Revenue Percentage
						</Typography>
						<Typography className={styles.sectionText} gutterBottom>
							What percentage of your total revenue comes from this product/service?
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<div className={styles.blockCenter}>
								<Typography color='secondary' variant="h6" gutterBottom>
									{currentProductPercentage} %
								</Typography>
							</div>
							<Slider
								value={currentProductPercentage}
								valueLabelDisplay="auto"
								marks
								min={0}
								max={getPercentageMax()}
								step={5}
								onChange={handleCurrentProductPercentageChange}
							/>
						</FormControl>
					</div>
					<div style={{ marginBottom: 32 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Revenue Per Transaction
						</Typography>
						<Typography className={styles.sectionText} style={{ marginTop: 10 }} gutterBottom>
							What is the average revenue per transaction for this product/service?
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-product-revenue-per-transaction-input"
								label="Average Revenue Per Transaction"
								className={styles.textField}
								name="currentProductRevenuePerTransaction"
								value={currentProductRevenuePerTransaction}
								onChange={handleCurrentProductRevenuePerTransactionChange}
								onBlur={handleCurrentProductRevenuePerTransactionBlur}
								autoComplete="currentProductRevenuePerTransaction"
								margin="normal"
								variant="outlined"
								error={currentProductRevenuePerTransactionInvalid}
								helperText={
									currentProductRevenuePerTransactionInvalid
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
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Profit Margin
						</Typography>
						<Typography className={styles.sectionText} gutterBottom>
							What is your profit margin on this product/service?
							<Tooltip title="The amount by which revenue from sales exceeds costs in a business.  Why do we need this?  It enables us to analyze whether your current marketing efforts are returning on your investment.">
								<IconButton aria-label="info">
									<InfoIcon />
								</IconButton>
							</Tooltip>
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-product-profit-margin-input"
								label="Profit Margin"
								className={styles.textField}
								name="currentProductProfitMargin"
								value={currentProductProfitMargin}
								onChange={handleCurrentProductProfitMarginChange}
								onBlur={handleCurrentProductProfitMarginBlur}
								autoComplete="currentProductProfitMargin"
								margin="normal"
								variant="outlined"
								error={currentProductProfitMarginInvalid}
								helperText={
									currentProductProfitMarginInvalid
										? "Profit Margin must be a number (e.g., 123000)"
										: ""
								}
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>
								}}
							/>
						</FormControl>
					</div>
					<div style={{ marginBottom: 32 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Quantity Sold
						</Typography>
						<Typography className={styles.sectionText} style={{ marginTop: 10 }} gutterBottom>
							How many of this product/service do you sell per month?
							<Tooltip title="Why do we need this?  It enables us determine if your sales are correlating with your marketing efforts.">
								<IconButton aria-label="info">
									<InfoIcon />
								</IconButton>
							</Tooltip>
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-product-quantity-sold-input"
								label="Quantity Sold"
								className={styles.textField}
								name="currentProductQuantitySold"
								value={currentProductQuantitySold}
								onChange={handleCurrentProductQuantitySoldChange}
								onBlur={handleCurrentProductQuantitySoldBlur}
								autoComplete="currentProductQuantitySold"
								margin="normal"
								variant="outlined"
								error={currentProductQuantitySoldInvalid}
								helperText={
									currentProductQuantitySoldInvalid
										? "Quantity Sold must be a number (e.g., 123000)"
										: ""
								}
							/>
						</FormControl>
					</div>
					<div style={{ marginBottom: 20 }}>
						<Typography className={styles.sectionHeader} color='secondary' gutterBottom>
							Purchase Frequency
						</Typography>
						<Typography className={styles.sectionText} gutterBottom>
							Are the customers that buy this product/service one-time buyers, or are they repeat customers?
						</Typography>
						<FormControl component="fieldset" className={styles.formControl}>
							<RadioGroup
								aria-label="currentProductCustomerType"
								name="currentProductCustomerType"
								className={styles.group}
								value={currentProductCustomerType}
								onChange={handleCurrentProductCustomerTypeChange}
							>
								<FormControlLabel value="one_time" control={<Radio />} label="One Time" />
								<FormControlLabel value="repeat" control={<Radio />} label="Repeat" />
							</RadioGroup>
						</FormControl>
					</div>
					<div style={{ marginBottom: 32, display: (currentProductCustomerType === 'repeat') ? 'block' : 'none' }}>
						<Typography className={styles.sectionText} gutterBottom>
							How many times do they re-purchase this product / service?
						</Typography>
						<FormControl variant="outlined" className={styles.formControl}>
							<TextField
								id="outlined-product-purchase-instances-input"
								label="Number of Times"
								className={styles.textField}
								name="currentProductPurchaseTimes"
								value={currentProductPurchaseTimes}
								onChange={handleCurrentProductPurchaseTimesChange}
								autoComplete="currentProductPurchaseTimes"
								margin="normal"
								variant="outlined"
							/>
						</FormControl>
						<FormControl variant="outlined" className={styles.formControl}>
							<Select
								className={styles.selector}
								value={currentProductPurchaseInterval}
								onChange={handleCurrentProductPurchaseIntervalChange}
								input={
									<OutlinedInput
										name="currentProductPurchaseInterval"
										labelWidth={0}
									/>
								}
							>
								<MenuItem value=""><em>Select Interval</em></MenuItem>
								<MenuItem value={'day'}>Per Day</MenuItem>
								<MenuItem value={'week'}>Per Week</MenuItem>
								<MenuItem value={'month'}>Per Month</MenuItem>
								<MenuItem value={'year'}>Per Year</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<div className={styles.buttonBar}>
					<Button
						onClick={closeRevenueDialog}
						className={styles.backButton}
						size="large"
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleProductSubmit}
						size="large"
						disabled={
							(!currentProductName || currentProductRevenuePerTransactionInvalid || currentProductProfitMarginInvalid || currentProductQuantitySoldInvalid)
						}
					>
						Save
					</Button>
				</div>
			</form>
		</BaseDialog>
	)
}