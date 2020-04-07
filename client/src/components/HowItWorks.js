import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from './Page';

const useStyles = makeStyles(theme => ({
	title: {
		fontFamily: 'Arial Narrow',
		fontSize: 42,
		fontWeight: 900,
		color: '#E66464',
		textTransform: 'uppercase'
	},
	subtitle: {
		fontSize: 24,
		color: '#444'
	}
}));

export default function HowItWorks(props) {
    const currentPath = props.location.pathname;
    const styles = useStyles();
    return (
        <Page currentPath={currentPath} includeBackgroundGraphic={true}>
            <div className={styles.title}>
                How It Works
            </div>
            <div className={styles.subtitle}>
                Let's give you the run down
            </div>
            <div>
                <p>
                    Second Metrics is a tool to help you analyze your digital marketing strategy to determine whether it 
                    is effectively increasing your bottom line. It helps you to rate your current marketing strategy and 
                    will recommend actions for you to take to improve how you market your business.
                </p>
                <p>
                    Most agencies won’t tell you that they’re wasting your money. So, we will.
                </p>
                <p>
                    Second Metrics watches the watchers.  It helps you make sure your digital marketing strategy is being followed.
                </p>
                <p>
                    You can't improve what you don't measure.
                </p>
            </div>
        </Page>
    )
}