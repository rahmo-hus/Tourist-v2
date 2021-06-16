import React, {useEffect, useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tr: {
        background: '#f1f1f1'
    }
}));

function ChartComponent(props) {

    const classes = useStyles();
    const[dataPoints, setDataPoints] = useState([]);
    let timesSolvedTotal = 0;
    const {statistics} = props;

    useEffect(() => {
        statistics.map((value, key) => {
            timesSolvedTotal += value.timesSolved;
        });
        statistics.map((value, key) => {
            const newElement = {
                y: timesSolvedTotal != 0 ? Math.round(value.timesSolved * 100 / timesSolvedTotal) : 0,
                label: value.title.en_us
            };

            setDataPoints(prevState => [...prevState, newElement]);
        });
    }, []);

    const tableContent = dataPoints.map((item, key) => {
        return (
            <TableRow>
                <TableCell component="th" scope="row">{item.label}</TableCell>
                <TableCell align="right">{item.y}%</TableCell>
            </TableRow>
        )
    });


    return (
        <React.Fragment>
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={classes.tr}>
                            <TableCell component="th">
                                Naziv zadatka
                            </TableCell>
                            <TableCell align="right">
                                Postotak posjecenosti
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default ChartComponent;
