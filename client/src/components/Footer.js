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
                        <Link to='/by-country' className={styles.link}>
                            By Country
                        </Link>
                        <br />
                        <Link to='/by-state' className={styles.link}>
                            By State
                        </Link>
                        <br />
                        <Link to='/projects' className={styles.link}>
                            Projections
                        </Link>
                    </div>
                </Grid>
                <Grid container item xs={6} sm={3} className={styles.flex} alignItems="baseline">
                    <div className={styles.linkArea}>
                        <div className={styles.linkHeader}>
                            Legal
                        </div>
                    </div>
                </Grid>
                <Grid container item xs={12} sm={6} className={styles.flex} alignItems="baseline">
                    <div className={styles.linkArea}>
                        <div className={styles.linkHeader}>
                            Coronavirus Stats
                        </div>
                        <div className={styles.bodyText}>
                            Coronavirus Stats is a tool to help you analyze and understand the spread of the Coronavirus
                            (COVID-19) disease.
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        Copyright © 2019 Coronavirus Stats
                    </div>
                </Grid>
                    
            </Grid>
        </div>
    )
}