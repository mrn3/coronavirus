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
                            Bar Charts
                        </div>
                        <Link to='/coronavirus/by-country' className={styles.link}>
                            By Country
                        </Link>
                        <br />
                        <Link to='/coronavirus/by-state' className={styles.link}>
                            By State
                        </Link>
                        <Link to='/coronavirus/daily-changes' className={styles.link}>
                            Daily Changes
                        </Link>
                        <br />

                    </div>
                </Grid>
                <Grid container item xs={6} sm={3} className={styles.flex} alignItems="baseline">
                    <div className={styles.linkArea}>
                        <div className={styles.linkHeader}>
                            Line Charts
                        </div>
                        <Link to='/coronavirus/projections' className={styles.link}>
                            Projections
                        </Link>
                    </div>
                </Grid>
                <Grid container item xs={12} sm={6} className={styles.flex} alignItems="baseline">
                    <div className={styles.linkArea}>
                        <div className={styles.linkHeader}>
                            Coronavirus Statistics
                        </div>
                        <div className={styles.bodyText}>
                            Coronavirus Statistics is a tool to help you analyze and understand the spread of the Coronavirus
                            (COVID-19) disease in various countries of the world and states in the US.
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        Copyright © 2020 Coronavirus Statistics
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}