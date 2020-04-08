import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import unirest from "unirest";
import moment from "moment";
import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Papa from "papaparse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Page from './Page';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 10
    },
    tableContainer: {
        maxHeight: 640
    },
    formControl: {
        minWidth: 120
    },
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


const DailyChanges = (props) => {
    const currentPath = props.location.pathname;
    const [statArray, setStatArray] = useState([]);
    const classes = useStyles();
    const [selectedState, setSelectedState] = React.useState('Alabama');
    const [shown, setShown] = React.useState({
        cases: false,
        casesDailyChange: true,
        deaths: false,
        deathsDailyChange: false
    });

    const getStateArray = statArray => {
        let returnStateArray = [];
        let stat;
        for (stat of statArray) {
            if (!returnStateArray.includes(stat.state)) {
                returnStateArray.push(stat.state);
            }
        }
        returnStateArray.sort();
        return returnStateArray;
    };
    const stateArray = getStateArray(statArray);

    const handleShownChange = event => {
        setShown({ ...shown, [event.target.name]: event.target.checked });
    };

    const handleSelectedStateChange = event => {
        setSelectedState(event.target.value);
    };

    const getLineChartRowArray = statArray => {
        let currentCases = 0;
        let previousCases = 0;
        let currentDeaths = 0;
        let previousDeaths = 0;
        return statArray
            .filter(stat => selectedState === stat.state)
            .map(stat => {
                currentCases = stat.cases;
                currentDeaths = stat.deaths;
                let returnObject = {
                    state: stat.state,
                    date: stat.date,
                    dateUnix: moment(stat.date).unix(),
                    cases: stat.cases,
                    casesDailyChange: currentCases - previousCases,
                    deaths: stat.deaths,
                    deathsDailyChange: currentDeaths - previousDeaths,
                };
                previousCases = currentCases;
                previousDeaths = currentDeaths;
                return returnObject;
            })
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    };
    const lineChartRows = getLineChartRowArray(statArray);

    async function fetchData() {
        let req = unirest(
            "GET",
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
        );

        req.end(res => {
            if (res.error) throw new Error(res.error);
            const parsedResults = Papa.parse(res.body, {
                header: true,
                delimiter: ","
            });
            let statArray = parsedResults.data.map(stat => {
                return {
                    state: stat.state,
                    date: stat.date,
                    cases: parseInt(stat.cases, 10),
                    deaths: parseInt(stat.deaths, 10),
                    deathRate:
                        Math.round(
                            (parseInt(stat.deaths, 10) / parseInt(stat.cases, 10)) * 10000
                        ) / 100
                };
            });
            setStatArray(statArray);
        });
    }

    useEffect(() => {
        if (statArray.length < 1) {
            fetchData();
        }
    });

    return (
        <Page currentPath={currentPath} contentWidth={1600} includeBackgroundGraphic={false}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="selectedState">State</InputLabel>
                                    <Select
                                        labelId="selectedState"
                                        id="selectedState"
                                        value={selectedState}
                                        onChange={handleSelectedStateChange}
                                        label="State"
                                    >
                                        {stateArray.map(state => (
                                            <MenuItem key={state} value={state}>
                                                {state}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <h2>Show</h2>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.casesDailyChange}
                                        onChange={handleShownChange}
                                        name="casesDailyChange"
                                        color="primary"
                                    />
                                }
                                label="Cases Daily Change"
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.cases}
                                        onChange={handleShownChange}
                                        name="cases"
                                        color="primary"
                                    />
                                }
                                label="Cumulative Cases"
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.deathsDailyChange}
                                        onChange={handleShownChange}
                                        name="deathsDailyChange"
                                        color="primary"
                                    />
                                }
                                label="Deaths Daily Change"
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.deaths}
                                        onChange={handleShownChange}
                                        name="deaths"
                                        color="primary"
                                    />
                                }
                                label="Cumulative Deaths"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <ResponsiveContainer width="100%" aspect={15.0 / 8.0}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={lineChartRows}
                                        margin={{
                                            top: 20, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="dateUnix"
                                            domain={["auto", "auto"]}
                                            name="Date"
                                            tickFormatter={dateUnix =>
                                                moment.unix(dateUnix).format("YYYY-MM-DD")
                                            }
                                            type="number"
                                        />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend
                                            layout="horizontal"
                                            verticalAlign="top"
                                            align="center"
                                        />
                                        {shown.cases && (
                                            <Bar
                                                name="Cumulative Cases"
                                                type="monotone"
                                                dataKey="cases"
                                                fill="#f80"
                                                stackId="1"
                                            />
                                        )}
                                        {shown.casesDailyChange && (
                                            <Bar
                                                name="Cases Daily Change"
                                                type="monotone"
                                                dataKey="casesDailyChange"
                                                fill="#d6a"
                                                stackId="1"
                                            />
                                        )}
                                        {shown.deaths && (
                                            <Bar
                                                name="Cumulative Deaths"
                                                type="monotone"
                                                dataKey="deaths"
                                                fill="#e33"
                                                stackId="1"
                                            />
                                        )}
                                        {shown.deathsDailyChange && (
                                            <Bar
                                                name="Deaths Daily Change"
                                                type="monotone"
                                                dataKey="deathsDailyChange"
                                                fill="#a4a"
                                                stackId="1"
                                            />
                                        )}
                                    </BarChart>
                                </ResponsiveContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Page>
    );
};

export default DailyChanges;
