import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import unirest from "unirest";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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


const ByCountry = (props) => {
    const currentPath = props.location.pathname;
    const [stats, setStats] = useState([]);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortBy, setSortBy] = React.useState("totalCases");
    const [shown, setShown] = React.useState({
        cases: true,
        deaths: true,
        active: true,
        recovered: true
    });

    const handleCheckboxChange = event => {
        setShown({ ...shown, [event.target.name]: event.target.checked });
    };

    const handleChange = event => {
        setSortBy(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getIntegerFromPlusString = plusString => {
        return plusString ? parseInt(plusString.substring(1), 10) : 0;
    };

    const getStatObject = stat => {
        let returnObject = {
            name: stat.country,
            totalCases: stat.cases.total,
            newCases: getIntegerFromPlusString(stat.cases.new)
        };
        if (shown.deaths) {
            returnObject.priorDeaths =
                stat.deaths.total - getIntegerFromPlusString(stat.deaths.new);
            returnObject.newDeaths = getIntegerFromPlusString(stat.deaths.new);
        }
        if (shown.active) {
            returnObject.nonCriticalCases = stat.cases.active - stat.cases.critical;
            returnObject.criticalCases = stat.cases.critical;
        }
        if (shown.recovered) {
            returnObject.recoveredCases = stat.cases.recovered;
        }
        return returnObject;
    };

    const sortAscending = sortBy === 'name' ? -1 : 1;

    const rows = stats
        .map(stat => {
            return getStatObject(stat);
        })
        .sort((a, b) => (a[sortBy] < b[sortBy] ? 1 * sortAscending : -1 * sortAscending));

    //just get top 10
    const chartRows = stats
        .slice(0, 10)
        .filter(stat => stat.country !== "All")
        .map(stat => {
            return getStatObject(stat);
        })
        .sort((a, b) => (a[sortBy] < b[sortBy] ? 1 * sortAscending : -1 * sortAscending));

    const columns = [{ id: "name", label: "Country", minWidth: 100 }];
    columns.push({ id: "totalCases", label: "Total Cases", minWidth: 60 });
    columns.push({ id: "newCases", label: "New Cases", minWidth: 50 });
    if (shown.deaths) {
        columns.push({ id: "newDeaths", label: "New Deaths", minWidth: 50 });
        columns.push({ id: "priorDeaths", label: "Prior Deaths", minWidth: 50 });
    }
    if (shown.active) {
        columns.push({
            id: "criticalCases",
            label: "Critical Cases",
            minWidth: 60
        });
        columns.push({
            id: "nonCriticalCases",
            label: "Non-Critical Cases",
            minWidth: 60
        });
    }
    if (shown.recovered) {
        columns.push({
            id: "recoveredCases",
            label: "Recovered Cases",
            minWidth: 60
        });
    }

    async function fetchData() {
        let req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");

        req.headers({
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "4d6ca13f5fmsh9f19a8a950f47fbp1f836ajsn3031c33b0005"
        });

        req.end(res => {
            if (res.error) throw new Error(res.error);
            setStats(res.body.response);
        });
    }

    useEffect(() => {
        if (stats.length < 1) {
            fetchData();
        }
    });

    return (
        <Page currentPath={currentPath} contentWidth={1600} includeBackgroundGraphic={false}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                Show:
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={shown.deaths}
                                                onChange={handleCheckboxChange}
                                                name="deaths"
                                                color="primary"
                                            />
                                        }
                                        label="Deaths"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={shown.active}
                                                onChange={handleCheckboxChange}
                                                name="active"
                                                color="primary"
                                            />
                                        }
                                        label="Active"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={shown.recovered}
                                                onChange={handleCheckboxChange}
                                                name="recovered"
                                                color="primary"
                                            />
                                        }
                                        label="Recovered"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="sortBy">Sort By</InputLabel>
                                    <Select
                                        labelId="sortBy"
                                        id="sortBy"
                                        value={sortBy}
                                        onChange={handleChange}
                                        label="Sort By"
                                    >
                                        {columns.map(column => (
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
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(row => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.name}
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
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <ResponsiveContainer width="100%" aspect={4.0 / 4.0}>
                            <BarChart
                                data={chartRows}
                                layout="vertical"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 40,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="newDeaths"
                                    name="New Deaths"
                                    stackId="1"
                                    fill="#e33"
                                />
                                <Bar
                                    dataKey="priorDeaths"
                                    name="Prior Deaths"
                                    stackId="1"
                                    fill="#f51"
                                />
                                <Bar
                                    dataKey="criticalCases"
                                    name="Critical Cases"
                                    stackId="1"
                                    fill="#f80"
                                />
                                <Bar
                                    dataKey="nonCriticalCases"
                                    name="Non-Critical Cases"
                                    stackId="1"
                                    fill="#fd3"
                                />
                                <Bar
                                    dataKey="recoveredCases"
                                    name="Recovered"
                                    stackId="1"
                                    fill="#7b4"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </div>
        </Page>
    );
};

export default ByCountry;
