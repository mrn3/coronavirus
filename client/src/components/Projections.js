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
    LineChart,
    Line
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


const Projections = (props) => {
    const currentPath = props.location.pathname;
    const [statArray, setStatArray] = useState([]);
    const classes = useStyles();
    const [selectedState, setSelectedState] = React.useState("Alabama");
    const [projectLastDays, setProjectLastDays] = React.useState(7);
    const [projectFutureDays, setProjectFutureDays] = React.useState(7);
    const [shown, setShown] = React.useState({
        cases: true,
        casesLinear: true,
        casesPercentage: true,
        deaths: false,
        deathsLinear: false,
        deathsPercentage: false
    });

    const getStateArray = statArray => {
        let returnStateArray = [];
        for (let stat of statArray) {
            if (!returnStateArray.includes(stat.state)) {
                returnStateArray.push(stat.state);
            }
        }
        returnStateArray.sort();
        return returnStateArray;
    };
    const stateArray = getStateArray(statArray);

    const getMaxDate = statArray => {
        let returnMaxDate = "";
        if (statArray && statArray.length) {
            for (let stat of statArray) {
                if (stat.date > returnMaxDate) {
                    returnMaxDate = stat.date;
                }
            }
        }
        return returnMaxDate;
    };

    const handleShownChange = event => {
        setShown({ ...shown, [event.target.name]: event.target.checked });
    };

    const handleProjectLastDaysChange = event => {
        setProjectLastDays(event.target.value);
    };

    const handleProjectFutureDaysChange = event => {
        setProjectFutureDays(event.target.value);
    };

    const handleSelectedStateChange = event => {
        setSelectedState(event.target.value);
    };

    const getActualsLineChartRowArray = statArray => {
        return statArray
            .filter(stat => stat.state === selectedState)
            .map(stat => {
                return {
                    state: stat.state,
                    date: stat.date,
                    dateUnix: moment(stat.date).unix(),
                    cases: stat.cases,
                    deaths: stat.deaths
                };
            })
            .sort((a, b) => (a.date < b.date ? -1 : 1));
    };
    const actualsLineChartRowArray = getActualsLineChartRowArray(statArray);

    let casesPerDayLinear;
    let deathsPerDayLinear;
    let casesPerDayPercentage;
    let deathsPerDayPercentage;

    let casesLinearLabel;
    let deathsLinearLabel;
    let casesPercentageLabel;
    let deathsPercentageLabel;

    const getProjectionLineChartRowArray = statArray => {
        let returnProjectionLineChartRowArray = [];
        if (selectedState !== "All") {
            let maxDate = getMaxDate(statArray);
            let maxDateMoment = moment(maxDate);
            let maxDateMinusMoment = moment(maxDateMoment).subtract(
                projectLastDays,
                "days"
            );

            let projectionEndDate = moment()
                .add(projectFutureDays, "days")
                .format("YYYY-MM-DD");

            //get the start and end values to calculate slope
            let maxDateCases = 0;
            let maxDateDeaths = 0;
            let maxDateMinusCases = 0;
            let maxDateMinusDeaths = 0;
            for (let stat of statArray) {
                if (stat.state === selectedState) {
                    if (maxDateMoment.isSame(stat.date)) {
                        maxDateCases = stat.cases;
                        maxDateDeaths = stat.deaths;
                    } else if (maxDateMinusMoment.isSame(stat.date)) {
                        maxDateMinusCases = stat.cases;
                        maxDateMinusDeaths = stat.deaths;
                    }
                }
            }
            casesPerDayLinear = Math.round(
                (maxDateCases - maxDateMinusCases) / projectLastDays
            );
            deathsPerDayLinear = Math.round(
                (maxDateDeaths - maxDateMinusDeaths) / projectLastDays
            );
            casesPerDayPercentage =
                1 +
                (maxDateCases - maxDateMinusCases) /
                (maxDateMinusCases || 1) /
                projectLastDays;
            deathsPerDayPercentage =
                1 +
                (maxDateDeaths - maxDateMinusDeaths) /
                (maxDateMinusDeaths || 1) /
                projectLastDays;

            casesLinearLabel = `Projected Cases Linear (${casesPerDayLinear}/day)`;
            deathsLinearLabel = `Projected Deaths Linear (${deathsPerDayLinear}/day)`;
            casesPercentageLabel = `Projected Cases Percentage (${Math.round(
                (casesPerDayPercentage - 1) * 100
            )}%/day)`;
            deathsPercentageLabel = `Projected Deaths Percentage (${Math.round(
                (deathsPerDayPercentage - 1) * 100
            )}%/day)`;

            //loop through dates
            let casesLinear = maxDateCases;
            let casesPercentage = maxDateCases;
            let deathsLinear = maxDateDeaths;
            let deathsPercentage = maxDateDeaths;
            for (
                let m = moment(maxDateMoment);
                m.isBefore(projectionEndDate, "day");
                m.add(1, "days")
            ) {
                let currentDate = m.format("YYYY-MM-DD");
                returnProjectionLineChartRowArray.push({
                    state: selectedState,
                    date: currentDate,
                    dateUnix: moment(currentDate).unix(),
                    casesLinear,
                    casesPercentage,
                    deathsLinear,
                    deathsPercentage
                });

                //increment last
                casesLinear += casesPerDayLinear;
                deathsLinear += deathsPerDayLinear;
                casesPercentage = Math.round(casesPercentage * casesPerDayPercentage);
                deathsPercentage = Math.round(
                    deathsPercentage * deathsPerDayPercentage
                );
            }
        }
        return returnProjectionLineChartRowArray;
    };
    const projectionLineChartRowArray = getProjectionLineChartRowArray(statArray);

    const lineChartRows = [
        ...actualsLineChartRowArray,
        ...projectionLineChartRowArray
    ];

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
                    <Grid item xs={12} sm={3}>
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
                                        <MenuItem key="All" value="All">
                                            All
                                        </MenuItem>
                                        {stateArray.map(state => (
                                            <MenuItem key={state} value={state}>
                                                {state}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Projection Based On Last</h3>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="projectLastDays">Number of Days</InputLabel>
                                <Select
                                    labelId="projectLastDays"
                                    id="projectLastDays"
                                    value={projectLastDays}
                                    onChange={handleProjectLastDaysChange}
                                    label="Number Of Days"
                                >
                                    <MenuItem key={1} value={1}>
                                        1
                    </MenuItem>
                                    <MenuItem key={2} value={2}>
                                        2
                    </MenuItem>
                                    <MenuItem key={3} value={3}>
                                        3
                    </MenuItem>
                                    <MenuItem key={4} value={4}>
                                        4
                    </MenuItem>
                                    <MenuItem key={5} value={5}>
                                        5
                    </MenuItem>
                                    <MenuItem key={6} value={6}>
                                        6
                    </MenuItem>
                                    <MenuItem key={7} value={7}>
                                        7
                    </MenuItem>
                                    <MenuItem key={10} value={10}>
                                        10
                    </MenuItem>
                                    <MenuItem key={14} value={14}>
                                        14
                    </MenuItem>
                                    <MenuItem key={30} value={30}>
                                        30
                    </MenuItem>
                                    <MenuItem key={60} value={60}>
                                        60
                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Project Out Into Future</h3>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="projectFutureDays">Number of Days</InputLabel>
                                <Select
                                    labelId="projectFutureDays"
                                    id="projectFutureDays"
                                    value={projectFutureDays}
                                    onChange={handleProjectFutureDaysChange}
                                    label="Number Of Days"
                                >
                                    <MenuItem key={1} value={1}>
                                        1
                    </MenuItem>
                                    <MenuItem key={2} value={2}>
                                        2
                    </MenuItem>
                                    <MenuItem key={3} value={3}>
                                        3
                    </MenuItem>
                                    <MenuItem key={4} value={4}>
                                        4
                    </MenuItem>
                                    <MenuItem key={5} value={5}>
                                        5
                    </MenuItem>
                                    <MenuItem key={6} value={6}>
                                        6
                    </MenuItem>
                                    <MenuItem key={7} value={7}>
                                        7
                    </MenuItem>
                                    <MenuItem key={10} value={10}>
                                        10
                    </MenuItem>
                                    <MenuItem key={14} value={14}>
                                        14
                    </MenuItem>
                                    <MenuItem key={30} value={30}>
                                        30
                    </MenuItem>
                                    <MenuItem key={60} value={60}>
                                        60
                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <h2>Show</h2>
                        <Grid item xs={12}>

                            <h3>Cases</h3>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.cases}
                                        onChange={handleShownChange}
                                        name="cases"
                                        color="primary"
                                    />
                                }
                                label="Actual Cases"
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.casesLinear}
                                        onChange={handleShownChange}
                                        name="casesLinear"
                                        color="primary"
                                    />
                                }
                                label={casesLinearLabel}
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.casesPercentage}
                                        onChange={handleShownChange}
                                        name="casesPercentage"
                                        color="primary"
                                    />
                                }
                                label={casesPercentageLabel}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Deaths</h3>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.deaths}
                                        onChange={handleShownChange}
                                        name="deaths"
                                        color="primary"
                                    />
                                }
                                label="Actual Deaths"
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.deathsLinear}
                                        onChange={handleShownChange}
                                        name="deathsLinear"
                                        color="primary"
                                    />
                                }
                                label={deathsLinearLabel}
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.deathsPercentage}
                                        onChange={handleShownChange}
                                        name="deathsPercentage"
                                        color="primary"
                                    />
                                }
                                label={deathsPercentageLabel}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={9} style={{ overflow: "scroll", height: 800 }}>

                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={12}>
                                <ResponsiveContainer width="100%" aspect={15.0 / 9.0}>
                                    <LineChart
                                        data={lineChartRows}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5
                                        }}
                                    >
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
                                            <Line
                                                name="Actual Cases"
                                                type="monotone"
                                                dataKey="cases"
                                                stroke="#f80"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}

                                        {shown.casesLinear && (
                                            <Line
                                                name={casesLinearLabel}
                                                type="monotone"
                                                dataKey="casesLinear"
                                                strokeDasharray="5 5"
                                                stroke="#f80"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.casesPercentage && (
                                            <Line
                                                name={casesPercentageLabel}
                                                type="monotone"
                                                dataKey="casesPercentage"
                                                strokeDasharray="5 5"
                                                stroke="#f80"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.deaths && (
                                            <Line
                                                name="Actual Deaths"
                                                type="monotone"
                                                dataKey="deaths"
                                                stroke="#e33"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.deathsLinear && (
                                            <Line
                                                name={deathsLinearLabel}
                                                type="monotone"
                                                dataKey="deathsLinear"
                                                stroke="#e33"
                                                strokeDasharray="5 5"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}

                                        {shown.deathsPercentage && (
                                            <Line
                                                name={deathsPercentageLabel}
                                                type="monotone"
                                                dataKey="deathsPercentage"
                                                stroke="#e33"
                                                strokeDasharray="5 5"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                    </LineChart>
                                </ResponsiveContainer>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        </Page>
    );
};

export default Projections;
