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

export default function OurStory(props) {
    const currentPath = props.location.pathname;
    const styles = useStyles();
    return (
        <Page currentPath={currentPath} includeBackgroundGraphic={true}>
            <div className={styles.title}>
                Our Story
            </div>
            <div className={styles.subtitle}>
                We'll start from the beginning
            </div>
            <div>
                
            </div>
        </Page>
    )
}