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
        casesNeutral: true,
        casesPessimistic: true,
        casesOptimistic: true,
        deaths: false,
        deathsNeutral: false,
        deathsPessimistic: false,
        deathsOptimistic: false
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

    const getMaxDate = statArray => {
        let returnMaxDate = "";
        if (statArray && statArray.length) {
            let stat;
            for (stat of statArray) {
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

    let casesPerDayNeutral;
    let deathsPerDayNeutral;
    let casesPerDayPessimistic;
    let deathsPerDayPessimistic;
    let casesPerDayOneDayPessimistic;
    let deathsPerDayOneDayPessimistic;

    let casesNeutralLabel;
    let deathsNeutralLabel;
    let casesPessimisticLabel;
    let deathsOptimisticLabel;
    let deathsPessimisticLabel;
    let casesOptimisticLabel;

    const getProjectionLineChartRowArray = statArray => {
        let returnProjectionLineChartRowArray = [];
        let projectOneDay = 1;
        let maxDate = getMaxDate(statArray);
        let maxDateMoment = moment(maxDate);
        let maxDateMinusMoment = moment(maxDateMoment).subtract(
            projectLastDays,
            "days"
        );
        let maxDateMinusOneDayMoment = moment(maxDateMoment).subtract(
            projectOneDay,
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
        let maxDateMinusOneDayCases = 0;
        let maxDateMinusOneDayDeaths = 0;
        let stat;
        for (stat of statArray) {
            if (stat.state === selectedState) {
                if (maxDateMoment.isSame(stat.date)) {
                    maxDateCases = stat.cases;
                    maxDateDeaths = stat.deaths;
                }
                if (maxDateMinusMoment.isSame(stat.date)) {
                    maxDateMinusCases = stat.cases;
                    maxDateMinusDeaths = stat.deaths;
                }
                if (maxDateMinusOneDayMoment.isSame(stat.date)) {
                    maxDateMinusOneDayCases = stat.cases;
                    maxDateMinusOneDayDeaths = stat.deaths;
                }
            }
        }
        casesPerDayNeutral = Math.round(
            (maxDateCases - maxDateMinusCases) / projectLastDays
        );
        deathsPerDayNeutral = Math.round(
            (maxDateDeaths - maxDateMinusDeaths) / projectLastDays
        );
        casesPerDayPessimistic =
            1 +
            (maxDateCases - maxDateMinusCases) /
            (maxDateMinusCases || 1) /
            projectLastDays;
        deathsPerDayPessimistic =
            1 +
            (maxDateDeaths - maxDateMinusDeaths) /
            (maxDateMinusDeaths || 1) /
            projectLastDays;
        casesPerDayOneDayPessimistic =
            1 +
            (maxDateCases - maxDateMinusOneDayCases) /
            (maxDateMinusOneDayCases || 1) /
            projectOneDay;
        deathsPerDayOneDayPessimistic =
            1 +
            (maxDateDeaths - maxDateMinusOneDayDeaths) /
            (maxDateMinusOneDayDeaths || 1) /
            projectOneDay;

        let casesPerDayOptimistic = casesPerDayPessimistic - casesPerDayOneDayPessimistic;
        let deathsPerDayOptimistic = deathsPerDayPessimistic - deathsPerDayOneDayPessimistic;

        casesNeutralLabel = `Projected Cases Neutral (${casesPerDayNeutral}/day)`;
        deathsNeutralLabel = `Projected Deaths Neutral (${deathsPerDayNeutral}/day)`;
        casesPessimisticLabel = `Projected Cases Pessimistic (${Math.round(
            (casesPerDayPessimistic - 1) * 100
        )}%/day)`;
        deathsPessimisticLabel = `Projected Deaths Pessimistic (${Math.round(
            (deathsPerDayPessimistic - 1) * 100
        )}%/day)`;
        casesOptimisticLabel = `Projected Cases Optimistic (${Math.round(
            -1 * casesPerDayOptimistic * 100
        )}%/day)`;
        deathsOptimisticLabel = `Projected Deaths Optimistic (${Math.round(
            -1 * deathsPerDayOptimistic * 100
        )}%/day)`;

        //loop through dates
        let casesNeutral = maxDateCases;
        let casesPessimistic = maxDateCases;
        let casesOptimistic = maxDateCases;
        //assume we are half way to flattening the curve
        let casesOptimisticMax = maxDateCases * 2;
        let deathsNeutral = maxDateDeaths;
        let deathsPessimistic = maxDateDeaths;
        let deathsOptimistic = maxDateDeaths;
        let deathsOptimisticMax = maxDateDeaths * 2;
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
                casesNeutral,
                casesPessimistic,
                casesOptimistic,
                deathsNeutral,
                deathsPessimistic,
                deathsOptimistic
            });

            //increment last
            casesNeutral += casesPerDayNeutral;
            casesPessimistic = Math.round(casesPessimistic * casesPerDayPessimistic);
            //casesOptimistic = Math.round(casesOptimistic * casesPerDayOptimistic);
            casesOptimistic = casesOptimistic +
                (1 - casesOptimistic / casesOptimisticMax) *
                casesOptimistic * casesPerDayOptimistic;
            deathsNeutral += deathsPerDayNeutral;
            deathsPessimistic = Math.round(
                deathsPessimistic * deathsPerDayPessimistic
            );
            deathsOptimistic = Math.round(
                deathsOptimistic * deathsPerDayOptimistic
            );
            deathsOptimistic = deathsOptimistic +
                (1 - deathsOptimistic / deathsOptimisticMax) *
                deathsOptimistic * deathsPerDayOptimistic;
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
                                        checked={shown.casesPessimistic}
                                        onChange={handleShownChange}
                                        name="casesPessimistic"
                                        color="primary"
                                    />
                                }
                                label={casesPessimisticLabel}
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.casesNeutral}
                                        onChange={handleShownChange}
                                        name="casesNeutral"
                                        color="primary"
                                    />
                                }
                                label={casesNeutralLabel}
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.casesOptimistic}
                                        onChange={handleShownChange}
                                        name="casesOptimistic"
                                        color="primary"
                                    />
                                }
                                label={casesOptimisticLabel}
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
                                        checked={shown.deathsPessimistic}
                                        onChange={handleShownChange}
                                        name="deathsPessimistic"
                                        color="primary"
                                    />
                                }
                                label={deathsPessimisticLabel}
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.deathsNeutral}
                                        onChange={handleShownChange}
                                        name="deathsNeutral"
                                        color="primary"
                                    />
                                }
                                label={deathsNeutralLabel}
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shown.deathsOptimistic}
                                        onChange={handleShownChange}
                                        name="deathsOptimistic"
                                        color="primary"
                                    />
                                }
                                label={deathsOptimisticLabel}
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
                                        width={500} height={300}
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
                                        {shown.casesPessimistic && (
                                            <Line
                                                name={casesPessimisticLabel}
                                                type="monotone"
                                                dataKey="casesPessimistic"
                                                strokeDasharray="5 5"
                                                stroke="#e33"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.casesNeutral && (
                                            <Line
                                                name={casesNeutralLabel}
                                                type="monotone"
                                                dataKey="casesNeutral"
                                                strokeDasharray="5 5"
                                                stroke="#fd3"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.casesOptimistic && (
                                            <Line
                                                name={casesOptimisticLabel}
                                                type="monotone"
                                                dataKey="casesOptimistic"
                                                strokeDasharray="5 5"
                                                stroke="#7b4"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.deaths && (
                                            <Line
                                                name="Actual Deaths"
                                                type="monotone"
                                                dataKey="deaths"
                                                stroke="#f51"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.deathsPessimistic && (
                                            <Line
                                                name={deathsPessimisticLabel}
                                                type="monotone"
                                                dataKey="deathsPessimistic"
                                                stroke="#e33"
                                                strokeDasharray="5 5"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.deathsNeutral && (
                                            <Line
                                                name={deathsNeutralLabel}
                                                type="monotone"
                                                dataKey="deathsNeutral"
                                                stroke="#fd3"
                                                strokeDasharray="5 5"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                        {shown.deathsOptimistic && (
                                            <Line
                                                name={deathsOptimisticLabel}
                                                type="monotone"
                                                dataKey="deathsOptimistic"
                                                stroke="#7b4"
                                                strokeDasharray="5 5"
                                                strokeWidth={2}
                                                dot={<div></div>}
                                            />
                                        )}
                                    </LineChart>
                                </ResponsiveContainer>
                            </Grid>
                        </Grid>
                        <ul>
                            <li>Pessimistic is based on the average daily percentage change in the last N days</li>
                            <li>Neutral is linear and based on the average daily change in the last N days</li>
                            <li>Optimistic assumes a flattening of the curve at 2X where it curently is,
                                and is based on the difference between the average daily percentage change in the last N days
                                and the daily percentage change since yesterday</li>
                        </ul>
                    </Grid>
                </Grid>
            </div>
        </Page>
    );
};

export default Projections;
