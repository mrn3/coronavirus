import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useMainContext } from '../MainContext';
import ServiceDialog from './ServiceDialog';
import moment from 'moment';
import Analyze from '../Analyze';
import ButtonBar from './ButtonBar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
    sectionHeader: {
        textTransform: 'uppercase',
        marginBottom: 0
    },
    actionButton: {
        backgroundColor: 'transparent'
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
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    table: {
        width: '100%',
    },
    tableContainer: {
        overflowX: 'auto',
        [theme.breakpoints.down('sm')]: {
			width: '400px'
        },
    }
}));

export default function Service(props) {
    const currentPath = props.location.pathname;
    const styles = useStyles();
    const {
        serviceDialog,
        closeServiceDialog,

        handleAddService,
        handleDeleteService,
        handleEditService,
        serviceArray,
    } = useMainContext();

    const formatDate = (dateString) => {
        let dateMoment = moment(dateString);
        if (dateMoment.isValid()) {
            return dateMoment.format('MM/DD/YYYY');
        }
    }

    const requiredServicesAdded = (serviceArray) => {
        let seoFound = false;
        let ppcFound = false;
        for (let service of serviceArray) {
            if (service.type === 'SEO') {
                seoFound = true;
            }
            if (service.type === 'PPC') {
                ppcFound = true;
            }
        }
        return seoFound && ppcFound;
    }

    const showError = (serviceArray) => {
        return serviceArray.length > 0 && (!requiredServicesAdded(serviceArray));
    }

    return (
        <Analyze currentPath={currentPath}>
            <Typography className={styles.sectionHeader} color='secondary' gutterBottom>
                Marketing Services
            </Typography>
            <Typography gutterBottom>
                Please provide information about the various marketing services you are receiving and the agencies providing these sevices.
                At a minimum, please enter at least SEO and PPC.
            </Typography>
            <br /><br />
            <Button onClick={handleAddService} variant='outlined' className={styles.actionButton}>
                Add Service
            </Button>
            <ServiceDialog
                onClose={closeServiceDialog}
                open={serviceDialog}
                title='Add'
            />
            <div className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Service</TableCell>
                            <TableCell>Provider</TableCell>
                            <TableCell>Billing Per Month</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serviceArray.map((service, idx) => (
                            <TableRow key={service.type + idx}>
                                <TableCell component='th' scope='row'>
                                    {service.type}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {service.providerName}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {
                                        service.billingPerMonth
                                            ? `$${service.billingPerMonth}`
                                            : ``
                                    }
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {formatDate(service.startedAt)}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {service.rating}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={handleEditService(idx)} variant='outlined' className={styles.actionButton}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={handleDeleteService(idx)} variant='outlined' className={styles.actionButton}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <SnackbarContent
                className={showError(serviceArray) ? styles.error : styles.errorHidden}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={styles.message}>
                        <ErrorIcon className={styles.icon} />
                        Please enter at least SEO and PPC services to continue.
                    </span>
                }
            />
            <ButtonBar history={props.history} />
        </Analyze>
    )
}