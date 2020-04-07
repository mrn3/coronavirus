import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Analyze from '../Analyze';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    circularProgress: {
        marginBottom: 32,
        width: 100,
        height: 100
    },
}));

export default function Analyzing(props) {
    const currentPath = props.location.pathname;
    const styles = useStyles();

    useEffect(() => {
        setTimeout(() => {
            props.history.push("/analyze/result");
        }, 3000);
    });

    return (
        <Analyze currentPath={currentPath}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: 380, textAlign: "center" }}>
                    <div style={{ marginBottom: 32 }}>
                        <Typography variant="h6" style={{ fontWeight: "bold" }} gutterBottom>
                            Analyzing
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            We are analyzing your metrics
                        </Typography>
                    </div>
                    <div>
                        <CircularProgress className={styles.circularProgress} />
                    </div>
                </div>
            </div>
        </Analyze>
    )
}