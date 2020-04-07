import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
	blockCenter: {
		padding: theme.spacing(2),
		textAlign: 'center'
	},
	buttonBar: {
        marginTop: 32,
        display: "flex",
        justifyContent: "center"
    },
	container: {
		maxWidth: 600,
		flexGrow: 1,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	stepsContainer: {
		marginLeft: 72,
		textAlign: 'left',
		marginTop: 20,
		height: 65
	},
	bottomMargin: {
		marginBottom: theme.spacing(2)
	},
	formControl: {
        width: "100%"
	},
	sectionHeader: {
        textTransform: 'uppercase',
		marginBottom: 0,
		textAlign: 'left'
	},
	sectionText: {
		textAlign: 'left'
	},
	selector: {
        marginTop: 15
    },
	textField: {},
}));

export default function BaseDialog(props) {
	const styles = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const { open, onClose, title } = props;
	return (

		<Dialog

			fullScreen={fullScreen}
			
			//fullWidth={true}
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			scroll='body'

			// repositionOnUpdate={false}
			// autoDetectWindowHeight={false}
			// modal={false}
			// contentStyle={{width: '100%', transform: 'translate(0, 0)'}}
			// bodyStyle={{padding: 0}}
			// style={{paddingTop: 0, height: '100vh'}}
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<div className={styles.container}>
					{props.children}
				</div>
			</DialogContent>
		</Dialog>
	)
}