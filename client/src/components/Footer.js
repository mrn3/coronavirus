import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	footerContainer: {
        backgroundColor: '#333',
        width: '100%',
        marginTop: 'auto',
        padding: theme.spacing(2),
    },
    linkArea: {
        padding: 70
    },
    linkHeader: {
        fontWeight: 'bold',
        color: '#eee',
        paddingBottom: 10
    },
    link: {
		textDecoration: 'none',
		color: '#ccc'
    },
    bodyText: {
		color: '#ccc'
    },
    copyright: {
        color: '#ccc',
        marginLeft: 'auto',
        marginRight: 30
    }
}));

export default function Footer(props) {
    const styles = useStyles();
    return (
        <div className={styles.footerContainer}>
            <Grid container spacing={0} alignItems="baseline">
                <Grid container item xs={6} sm={3} className={styles.flex} alignItems="baseline">
                    <div className={styles.linkArea}>
                        <div className={styles.linkHeader}>
                            About
                        </div>
                        <Link to='/how-it-works' className={styles.link}>
                            How It Works
                        </Link>
                        <br />
                        <Link to='/our-story' className={styles.link}>
                            Our Story
                        </Link>
                    </div>
                </Grid>
                <Grid container item xs={6} sm={3} className={styles.flex} alignItems="baseline">
                    <div className={styles.linkArea}>
                        <div className={styles.linkHeader}>
                            Legal
                        </div>
                        <Link to='/privacy' className={styles.link}>
                            Privacy Policy
                        </Link>
                        <br />
                        <Link to='/terms' className={styles.link}>
                            Terms and Conditions
                        </Link>
                    </div>
                </Grid>
                <Grid container item xs={12} sm={6} className={styles.flex} alignItems="baseline">
                    <div className={styles.linkArea}>
                        <div className={styles.linkHeader}>
                            Second Metrics
                        </div>
                        <div className={styles.bodyText}>
                            Second Metrics is a tool to help you analyze your digital marketing strategy to determine 
                            whether it is effectively increasing your bottom line. It helps you to rate your current 
                            marketing strategy and will recommend actions for you to take to improve how you market your business
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        Copyright © 2019 Second Metrics
                    </div>
                </Grid>
                    
            </Grid>
        </div>
    )
}