import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PieChart from "../charts/PieChart";
import InputAdornment from '@material-ui/core/InputAdornment';
import { useMainContext } from "../MainContext";
import RevenueDialog from './RevenueDialog';
import Analyze from '../Analyze';
import ButtonBar from "./ButtonBar";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
    actionButton: {
        backgroundColor: "transparent"
    },
    error: {
        marginTop: 50,
        backgroundColor: theme.palette.error.dark,
    },
    errorHidden: {
        visibility: "hidden"
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    formControl: {
        width: "100%"
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    sectionHeader: {
        textTransform: 'uppercase',
        marginBottom: 0
    },
    selector: {
        marginTop: 15
    },
    tableContainer: {
        overflowX: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '400px'
        },
    },
    table: {
        maxWidth: 300
    },
}));

export default function Revenue(props) {
    const currentPath = props.location.pathname;
    const styles = useStyles();
    const {
        revenueDialog,
        closeRevenueDialog,

        annualRevenue,
        handleAnnualRevenueChange,
        annualRevenueInvalid,
        handleAnnualRevenueBlur,

        handleAddProduct,
        handleDeleteProduct,
        handleEditProduct,
        productArray,
    } = useMainContext();

    const getPieChartData = (productArray) => {
        let returnPieChartDataArray = [];
        let totalPercentage = 0;
        let product;
        for (product of (productArray || [])) {
            totalPercentage += product.percentage;
            returnPieChartDataArray.push({
                name: product.name,
                value: product.percentage
            });
        }
        let otherPercentage = 100 - totalPercentage;
        if (otherPercentage > 0) {  //don't display it if it is 0
            returnPieChartDataArray.push({
                name: 'Other',
                value: otherPercentage
            });
        }
        return returnPieChartDataArray;
    }

    const getTotalPercentage = (productArray) => {
        let totalUsedPercentage = 0;
        let product;
        for (product of productArray) {
            totalUsedPercentage += product.percentage;
        }
        return totalUsedPercentage;
    }

    const showError = () => {
        return productArray.length > 0 && (!annualRevenue || annualRevenueInvalid || getTotalPercentage(productArray) < 70);
    }

    return (
        <Analyze currentPath={currentPath}>
            <div style={{ marginBottom: 32 }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }} gutterBottom>
                    Enter Revenue Information
                </Typography>
                <Typography variant="body2" gutterBottom>
                    We need to get some basic info about your revenue.  Please provide your annual revenue and at least one revenue source to continue.
                </Typography>
            </div>
            <div style={{ marginBottom: 32 }}>
                <Typography className={styles.sectionHeader} color='secondary' gutterBottom>
                    Annual Revenue
                </Typography>
                <FormControl variant="outlined" className={styles.formControl}>
                    <TextField
                        id="outlined-annual-revenue-input"
                        label="Annual Revenue"
                        className={styles.textField}
                        name="annualRevenue"
                        value={annualRevenue}
                        onChange={handleAnnualRevenueChange}
                        onBlur={handleAnnualRevenueBlur}
                        autoComplete="annualRevenue"
                        margin="normal"
                        variant="outlined"
                        error={annualRevenueInvalid}
                        helperText={
                            annualRevenueInvalid
                                ? "Annual Revenue must be a number (e.g., 123000)"
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
                    Revenue Sources
                </Typography>
                <Typography gutterBottom>
                    What makes up the bulk of your revenue? Let’s focus on your 3-5 top products or services.
                    Please account for at least 70% of your revenue.
                </Typography>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Grid container justify="space-evenly" spacing={8}>
                            <Grid item>
                                <br /><br />
                                <Button onClick={handleAddProduct} variant="outlined" className={styles.actionButton}>
                                    Add Product/Service
                                </Button>
                                <RevenueDialog
                                    onClose={closeRevenueDialog}
                                    open={revenueDialog}
                                    title="Add Product/Service"
                                />
                                <div className={styles.tableContainer}>
                                    <Table className={styles.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Product/Service</TableCell>
                                                <TableCell>Edit</TableCell>
                                                <TableCell>Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {productArray.map((product, idx) => (
                                                <TableRow key={product.name + idx}>
                                                    <TableCell component="th" scope="row">
                                                        {product.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={handleEditProduct(idx)} variant="outlined" className={styles.actionButton}>
                                                            Edit
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={handleDeleteProduct(idx)} variant="outlined" className={styles.actionButton}>
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <SnackbarContent
                                    className={showError() ? styles.error : styles.errorHidden}
                                    aria-describedby="client-snackbar"
                                    message={
                                        <span id="client-snackbar" className={styles.message}>
                                            <ErrorIcon className={styles.icon} />
                                            You must enter your annual revenue and products or services to account <br />
                                            for at least 70% of your revenue to continue.
                                        </span>
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <PieChart
                                    data={getPieChartData(productArray)}
                                    height={350}
                                    width={350}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <ButtonBar history={props.history} />
        </Analyze>
    )
}