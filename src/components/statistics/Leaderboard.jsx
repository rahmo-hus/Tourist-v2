import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Date} from 'prismic-reactjs';


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    tr:{
        background:"#f1f1f1",
        '&:hover':{
            cursor:'pointer'
        }
    }

}));

function Leaderboard(props) {
    const classes = useStyles();
    const {leaderboard} = props;
    return (
        <React.Fragment>
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" className={classes.tr} onClick={()=>alert('table head clicked')}>Redni broj</TableCell>
                            <TableCell align="right" className={classes.tr}>Korisnicko ime</TableCell>
                            <TableCell align="right" className={classes.tr}>Osvojeni broj bodova&nbsp;</TableCell>
                            <TableCell align="right" className={classes.tr}>Trajanje igre&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard
                            .map((value, key) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {key + 1}
                                    </TableCell>
                                    <TableCell align="right">{value.username}</TableCell>
                                    <TableCell align="right">{value.score}</TableCell>
                                    <TableCell
                                        align="right">{new Date(value.endTime.toDate() - value.startTime.toDate()).toLocaleTimeString()}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default Leaderboard;
