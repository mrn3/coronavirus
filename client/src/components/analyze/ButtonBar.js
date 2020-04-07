import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useMainContext } from "../MainContext";

const useStyles = makeStyles(theme => ({
    buttonBar: {
        marginTop: 32,
        display: "flex",
        justifyContent: "center"
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
}));

export default function ButtonBar(props) {
    const styles = useStyles();
    const {
        productArray,

        currentServiceProviderName,

        activeStep,
        handleNext,
        handleBack,

        url,
        contactEmailInvalid,
        urlInvalid,

        annualRevenue,
        annualRevenueInvalid,
    } = useMainContext();

    const getTotalPercentage = (productArray) => {
        let totalUsedPercentage = 0;
        let product;
        for (product of productArray) {
            totalUsedPercentage += product.percentage;
        }
        return totalUsedPercentage;
    }

    // const requiredServicesAdded = (serviceArray) => {
    //     let seoFound = false;
    //     let ppcFound = false;
    //     for (let service of serviceArray) {
    //         if (service.type === 'SEO') {
    //             seoFound = true;
    //         }
    //         if (service.type === 'PPC') {
    //             ppcFound = true;
    //         }
    //     }
    //     return seoFound && ppcFound;
    // }

    const stepActions = () => {
        if (activeStep === 3) {
            return "Complete";
        } else {
            return "Next";
        }
    }

    return (
        <div>
            {activeStep !== 4 && (
                <div className={styles.buttonBar}>
                    {activeStep !== 3 ? (
                        <Button
                            disabled={activeStep === 0}
                            onClick={() => handleBack(props)}
                            className={styles.backButton}
                            size="large"
                        >
                            Back
                        </Button>
                    ) : (
                            <Button
                                disabled={activeStep === 0}
                                onClick={() => handleBack(props)}
                                className={styles.backButton}
                                size="large"
                            >
                                Back
                        </Button>
                        )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNext(props)}
                        size="large"
                        disabled={
                            (activeStep === 0 &&
                                (!url || contactEmailInvalid || urlInvalid)
                            ) ||
                            (activeStep === 1 &&
                                (!annualRevenue || annualRevenueInvalid || getTotalPercentage(productArray) < 70)
                            ) ||
                            (activeStep === 2 &&
                                (!currentServiceProviderName)
                            )
                        }
                    >
                        {stepActions()}
                    </Button>
                </div>
            )}
        </div>
    );
}