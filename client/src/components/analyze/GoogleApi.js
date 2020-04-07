import React from 'react';
import useAsyncEffect from 'use-async-effect';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { useMainContext } from "../MainContext";
import Analyze from '../Analyze';
import ButtonBar from "./ButtonBar";

const useStyles = makeStyles(theme => ({
    chartContainer: {
        width: '100%',
        marginBottom: 32
    }
}));

export default function BaseDialog(props) {
    const currentPath = props.location.pathname;
    const styles = useStyles();
    const {
        handleTimelineChange,
        url
    } = useMainContext();

    useAsyncEffect(async () => {

        window.gapi.analytics.ready(async () => {

            // Step 3: Authorize the user.
            window.gapi.analytics.auth.authorize({
                container: 'auth-button',
                clientid: '216805080489-meb4jr5urmm5561vhqb4gldsvhf6j7j9.apps.googleusercontent.com',
            });

            // Step 4: Create the view selector.
            let viewSelector = new window.gapi.analytics.ViewSelector({
                container: 'view-selector'
            });
            // Step 5: Create the timeline chart.

            //ga:users
            //ga:sessions
            //ga:bounceRate
            //ga:pageviewsPerSession
            //ga:avgSessionDuration
            //ga:medium

            let timeline = new window.gapi.analytics.googleCharts.DataChart({
                reportType: 'ga',
                query: {
                    'dimensions': 'ga:yearMonth',
                    'metrics': 'ga:users',
                    'start-date': '1060daysAgo',
                    'end-date': 'yesterday',
                },
                chart: {
                    type: 'LINE',
                    container: 'timeline',
                    options: {
                        title: 'Users over the past three years',
                        fontSize: 12
                    }
                }
            });
            let report = new window.gapi.analytics.report.Data({
                reportType: 'ga',
                query: {
                    'ids': 'ga:68833442',
                    'dimensions': 'ga:hostname',
                    'metrics': 'ga:sessions',
                    'start-date': '1060daysAgo',
                    'end-date': 'yesterday',
                }
            });
            report.on('success', function (response) {
                console.log(response);
            });
            report.execute();

            // Step 6: Hook up the components to work together.
            window.gapi.analytics.auth.on('signIn', (response) => {
                viewSelector.execute();
            });
            viewSelector.on('change', (ids) => {
                console.log(ids)
                var newIds = {
                    query: {
                        ids: ids
                    }
                }
                timeline.set(newIds).execute();
                handleTimelineChange(timeline);
            });
        });
    });

    return (
        <Analyze currentPath={currentPath}>
            <div style={{ marginBottom: 32 }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }} gutterBottom>
                    Google Analytics Access
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Please authorize access to your Google Analytics account by clicking the button below and logging in.
                    Remember to use the Google account that has access to Google Analytics for your site ({url}).
                </Typography>
            </div>
            <div>
                <div className={styles.chartContainer}>
                    <section id="auth-button"></section>
                    <section id="view-selector"></section>
                    <section id="timeline"></section>
                </div>
            </div>
            <ButtonBar history={props.history} />
        </Analyze>
    )
}