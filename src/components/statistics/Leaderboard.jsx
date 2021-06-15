import React, {useState} from 'react';
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
    tr: {
        background: "#f1f1f1",
        '&:hover': {
            cursor: 'pointer'
        }
    }

}));

function Leaderboard(props) {
    const classes = useStyles();
    const [reverse, setReverse] = useState(1);
    const [leaderboard, setLeaderboard] = useState(props.leaderboard.slice());

    const sortByUsername = () => {
        setReverse(reverse*(-1))
        setLeaderboard((board) => [...board.sort((a, b) => a.username > b.username ? reverse : reverse*(-1))]);
    }

    const sortByScore = () =>{
        setReverse(reverse * (-1));
        setLeaderboard((board) => [...board.sort((a,b) => (a.score- b.score) * reverse) ])
    }

    const sortByDuration = () =>{
        setReverse(reverse*(-1));
        setLeaderboard((board) => [...board.sort((a,b) => ((a.endTime.valueOf() - a.startTime.valueOf()) -
            (b.endTime.valueOf() - b.startTime.valueOf()))*reverse)])
    }

    let content = leaderboard.map((value, key) => {
            return (
                <TableRow>
                    <TableCell component="th" scope="row">
                        {key + 1}
                    </TableCell>
                    <TableCell align="right">{value.username}</TableCell>
                    <TableCell align="right">{value.score}</TableCell>
                    <TableCell
                        align="right">{new Date(value.endTime.toDate() - value.startTime.toDate()).toLocaleTimeString()}</TableCell>
                </TableRow>
            )
        }
    )

    return (
        <React.Fragment>
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" className={classes.tr}>Redni broj</TableCell>
                            <TableCell align="right" className={classes.tr} onClick={sortByUsername}>Korisnicko
                                ime</TableCell>
                            <TableCell align="right" className={classes.tr} onClick={sortByScore}>Osvojeni broj bodova&nbsp;</TableCell>
                            <TableCell align="right" className={classes.tr} onClick={sortByDuration}>Trajanje igre&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {content}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default Leaderboard;
