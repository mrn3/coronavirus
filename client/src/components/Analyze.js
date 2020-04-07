import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Page from './Page';
import { useMainContext } from "./MainContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary["A100"],
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "0 200px",
        paddingBottom: 400
    },
    stepContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stepGrid: {
        width: "80%"
    },
    stepper: {
        backgroundColor: "transparent"
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: "left",
        color: theme.palette.text.secondary,
        width: 980,
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 20px)'
        }
    },
}));

const getSteps = () => {
    return [
        "Business",
        "Revenue",
        "Marketing Services",
        "Google Analytics",
        "Result"
    ];
};

const pathStepObject = {
    '/analyze/business': {
        stepId: 0
    },
    '/analyze/revenue': {
        stepId: 1
    },
    '/analyze/service': {
        stepId: 2
    },
    '/analyze/google': {
        stepId: 3
    },
    '/analyze/analyzing': {
        stepId: 4
    },
    '/analyze/result': {
        stepId: 5
    },
};

export default function Analyze(props) {

    const steps = getSteps();
    const styles = useStyles();
    const {
        activeStep,
        setActiveStep,
    } = useMainContext();
    setActiveStep(pathStepObject[props.currentPath].stepId);

    return (
        <Page currentPath={props.currentPath} contentBackgroundColor={'#f9f9f9'}>
            <div className={styles.stepContainer}>
                <div className={styles.stepGrid}>
                    <Stepper classes={{ root: styles.stepper }} activeStep={activeStep}
                        alternativeLabel>
                        {steps.map(label => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
                <Paper className={styles.paper}>
                    {props.children}
                </Paper>
            </div>
        </Page>
    )
}