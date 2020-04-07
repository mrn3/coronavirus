import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useMainContext } from "../MainContext";
import IndustrySelect from "./IndustrySelect";
import Analyze from '../Analyze';
import ButtonBar from "./ButtonBar";

const useStyles = makeStyles(theme => ({
    formControl: {
        width: "100%"
    },
    sectionHeader: {
        textTransform: 'uppercase',
        marginBottom: 0
    },
    textField: {},
}));

export default function Business(props) {
    const currentPath = props.location.pathname;
    const styles = useStyles();
    const {
        url,
        handleUrlChange,
        urlInvalid,
        handleUrlBlur,

        businessType,
        handleBusinessTypeChange,

        businessSeasonality,
        handleBusinessSeasonalityChange,

        contactName,
        handleContactNameChange,

        contactEmail,
        handleContactEmailChange,
        contactEmailInvalid,
        handleContactEmailBlur
    } = useMainContext();

    return (
        <Analyze currentPath={currentPath}>
            <div style={{ marginBottom: 32 }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}
                    gutterBottom>
                    Enter Business Information
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Tell Us About Your Business
                </Typography>
            </div>
            <div style={{ marginBottom: 32 }}>
                <Typography className={styles.sectionHeader} color='secondary' gutterBottom>
                    Business Information
                </Typography>
                <FormControl variant="outlined" className={styles.formControl}>
                    <TextField
                        id="outlined-url-input"
                        label="Website Address"
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
                <FormControl variant="outlined" className={styles.formControl}>
                    <IndustrySelect />
                </FormControl>
            </div>
            <div style={{ marginBottom: 32 }}>
                <Typography className={styles.sectionHeader} color='secondary' gutterBottom>
                    Business Seasonality
                </Typography>
                <Typography className={styles.sectionText} gutterBottom>
                    Is your business seasonal? Your business is considered seasonal if it experiences periodic fluctuations in 
                    sales/traffic/revenue during certain seasons or months of the year.  
                    It may make significant gains during peak seasons and significant losses during off-peak seasons
                </Typography>
                <FormControl component="fieldset" className={styles.formControl}>
                    <RadioGroup
                        aria-label="businessSeasonality"
                        name="businessSeasonality"
                        className={styles.group}
                        value={businessSeasonality}
                        onChange={handleBusinessSeasonalityChange}
                    >
                        <FormControlLabel value="seasonal" control={<Radio />} label="Seasonal" />
                        <FormControlLabel value="not_seasonal" control={<Radio />} label="Not Seasonal" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div style={{ marginBottom: 32 }}>
                <Typography className={styles.sectionHeader} color='secondary' gutterBottom>
                    Business Type
                </Typography>
                <FormControl component="fieldset" className={styles.formControl}>
                    <RadioGroup
                        aria-label="businessType"
                        name="businessType"
                        className={styles.group}
                        value={businessType}
                        onChange={handleBusinessTypeChange}
                    >
                        <FormControlLabel value="ecommerce" control={<Radio />} label="eCommerce" />
                        <FormControlLabel value="service_based" control={<Radio />} label="Service-Based" />
                    </RadioGroup>
                </FormControl>
            </div>
            
            <div style={{ marginBottom: 32 }}>
                <Typography className={styles.sectionHeader} color='secondary' gutterBottom>
                    Contact Information
                </Typography>
                <FormControl variant="outlined" className={styles.formControl}>
                    <TextField
                        id="outlined-contact-name-input"
                        label="Contact Name"
                        className={styles.textField}
                        name="contactName"
                        value={contactName}
                        onChange={handleContactNameChange}
                        autoComplete="contactName"
                        margin="normal"
                        variant="outlined"
                    />
                </FormControl>
                <FormControl variant="outlined" className={styles.formControl}>
                    <TextField
                        id="outlined-contact-email-input"
                        label="Contact Email (e.g., joe@gmail.com)"
                        className={styles.textField}
                        type="contactEmail"
                        name="contactEmail"
                        value={contactEmail}
                        onChange={handleContactEmailChange}
                        onBlur={handleContactEmailBlur}
                        autoComplete="contactEmail"
                        margin="normal"
                        variant="outlined"
                        error={contactEmailInvalid}
                        helperText={
                            contactEmailInvalid
                                ? "Contact email must be a valid email address (e.g., joe@gmail.com)"
                                : ""
                        }
                    />
                </FormControl>
            </div>
            <ButtonBar history={props.history} />
        </Analyze>
    )
}