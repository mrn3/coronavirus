import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import unirest from "unirest";
import moment from "moment";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
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
import FormGroup from "@material-ui/core/FormGroup";
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


const ByState = (props) => {
    const currentPath = props.location.pathname;
    const [statArray, setStatArray] = useState([]);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [tableRowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortBy, setSortBy] = React.useState("cases");
    const [selectedDate, setSelectedDate] = React.useState("");
    const [selectedState, setSelectedState] = React.useState("All");
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

    const getDateArray = statArray => {
        let returnDateArray = [];
        for (let stat of statArray) {
            if (!returnDateArray.includes(stat.date)) {
                returnDateArray.push(stat.date);
            }
        }
        returnDateArray.sort();
        returnDateArray.reverse();
        return returnDateArray;
    };
    const dateArray = getDateArray(statArray);

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

    const handleSelectedDateChange = event => {
        setSelectedDate(event.target.value);
    };

    const handleSortByChange = event => {
        setSortBy(event.target.value);
    };

    const handleRowClick = row => {
        setSelectedState(row.state);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const sortAscending = sortBy === "state" ? -1 : 1;

    const tableRows = statArray
        .filter(stat => selectedState === stat.state || selectedState === "All")
        .filter(stat => selectedDate === stat.date)
        .sort((a, b) =>
            a[sortBy] < b[sortBy] ? 1 * sortAscending : -1 * sortAscending
        );

    //just get top 10
    const chartRows = statArray
        .filter(stat => selectedState === stat.state || selectedState === "All")
        .filter(stat => selectedDate === stat.date)
        .sort((a, b) =>
            a[sortBy] < b[sortBy] ? 1 * sortAscending : -1 * sortAscending
        );
    //.slice(0, 40);

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

    const columns = [
        { id: "state", label: "State", minWidth: 100 },
        { id: "date", label: "Date", minWidth: 50 },
        { id: "cases", label: "Cases", minWidth: 60 },
        { id: "deaths", label: "Deaths", minWidth: 60 },
        { id: "deathRate", label: "Death Rate %", minWidth: 60 }
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
            let maxDate = getMaxDate(statArray);
            setSelectedDate(maxDate);
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
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="selectedDate">Date</InputLabel>
                                    <Select
                                        labelId="selectedDate"
                                        id="selectedDate"
                                        value={selectedDate}
                                        onChange={handleSelectedDateChange}
                                        label="Date"
                                    >
                                        {dateArray.map(date => (
                                            <MenuItem key={date} value={date}>
                                                {date}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="sortBy">Sort By</InputLabel>
                                    <Select
                                        labelId="sortBy"
                                        id="sortBy"
                                        value={sortBy}
                                        onChange={handleSortByChange}
                                        label="Sort By"
                                    >
                                        {columns
                                            .filter(column => column.id !== "date")
                                            .map(column => (
                                                <MenuItem key={column.id} value={column.id}>
                                                    {column.label}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Paper>
                            <TableContainer className={classes.tableContainer}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map(column => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableRows
                                            .slice(
                                                page * tableRowsPerPage,
                                                page * tableRowsPerPage + tableRowsPerPage
                                            )
                                            .map(row => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.state}
                                                        onClick={() => {
                                                            handleRowClick(row);
                                                        }}
                                                    >
                                                        {columns.map(column => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === "number"
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={tableRows.length}
                                rowsPerPage={tableRowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ overflow: "scroll", height: 800 }}>
                        <ResponsiveContainer width="100%" aspect={4.0 / 10.0}>
                            <BarChart
                                data={chartRows}
                                layout="vertical"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 60,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="state" />
                                <Tooltip />
                                <Legend
                                    layout="horizontal"
                                    verticalAlign="top"
                                    align="center"
                                />
                                <Bar dataKey="deaths" name="Deaths" stackId="1" fill="#e33" />
                                <Bar dataKey="cases" name="Cases" stackId="1" fill="#f80" />
                            </BarChart>
                        </ResponsiveContainer>

                    </Grid>
                </Grid>
            </div>
        </Page>
    );
};

export default ByState;
