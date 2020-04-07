import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LineChart from "../charts/LineChart";
import { useMainContext } from "../MainContext";
import Analyze from '../Analyze';
import ButtonBar from "./ButtonBar";

const useStyles = makeStyles(theme => ({
    sectionHeader: {
        textTransform: 'uppercase',
        marginBottom: 0
    },
}));

export default function Result(props) {
    const currentPath = props.location.pathname;
    const styles = useStyles();
    const {
        currentServiceStartedAt,
        timeline,
    } = useMainContext();

    const getLineChartSeriesArray = (timeline, currentServiceStartedAt) => {
        console.log('getLineChartSeriesArray currentServiceStartedAt', currentServiceStartedAt);
        //2020-03-10

        let returnLineChartSeriesArray = [];

        currentServiceStartedAt = '2019-02-10';
        let currentServiceStartedAtArray = currentServiceStartedAt.split(['-']);
        let serviceStartedAt = `${currentServiceStartedAtArray[0]}${currentServiceStartedAtArray[1]}`;
        console.log('serviceStartedAt', serviceStartedAt)

        timeline = {
            yf: {
                rows: [
                    {
                        c: [
                            {
                                v: '201901'
                            },
                            {
                                v: 5000
                            }
                        ]
                    },
                    {
                        c: [
                            {
                                v: '201902'
                            },
                            {
                                v: 3242
                            }
                        ]
                    },
                    {
                        c: [
                            {
                                v: '201903'
                            },
                            {
                                v: 6000
                            }
                        ]
                    },
                    {
                        c: [
                            {
                                v: '201904'
                            },
                            {
                                v: 2342
                            }
                        ]
                    },
                    {
                        c: [
                            {
                                v: '201905'
                            },
                            {
                                v: 4234
                            }
                        ]
                    },
                ]
            }
        };

        let lineChartDataArray = [];
        let endTrendValue;
        if (timeline && timeline.yf && timeline.yf.rows) {
            lineChartDataArray = timeline.yf.rows.map((row) => {
                let category = row.c[0].v;
                let value = row.c[1].v;
                if (serviceStartedAt === category) {
                    endTrendValue = value;
                }
                return {
                    category,
                    value,
                }
            });
        }
        let lastEntry = lineChartDataArray[lineChartDataArray.length - 1];
        
        let serviceTrendDataArray = [
            {
                category: serviceStartedAt,
                value: endTrendValue
            },
            {
                category: lastEntry.category,
                value: lastEntry.value
            },
        ]

        returnLineChartSeriesArray = [
            {
              name: 'Monthly Traffic',
              data: lineChartDataArray,
            },
            {
              name: 'Trend Since Starting Service',
              data: serviceTrendDataArray,
            },
          ];


        console.log('returnLineChartSeriesArray', returnLineChartSeriesArray)
        return returnLineChartSeriesArray;
    }

    const legendPayload = [
        { value: 'Monthly Traffic', type: 'line', id: 'monthlyTraffic' }, 
        { value: 'Service Trend', type: 'line', id: 'serviceTrend' }
    ];

    return (
        <Analyze currentPath={currentPath}>
            <div style={{ marginBottom: 32 }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }} gutterBottom>
                    Result
                </Typography>
                <Typography variant="body2" gutterBottom>
                    This is the result of our analysis
                </Typography>
            </div>
            <div style={{ marginBottom: 32 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={9} style={{ border: '1px solid black' }}>
                        <LineChart
                            lineChartSeriesArray={getLineChartSeriesArray(timeline, currentServiceStartedAt)}
                            height={400}
                            payload={legendPayload}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ border: '1px solid black' }}>
                        Grade
                    </Grid>
                    <Grid item xs={12} style={{ border: '1px solid black' }}>
                        Observations and Analysis
                    </Grid>
                </Grid>
            </div>
            <ButtonBar history={props.history} />
        </Analyze>
    )
}