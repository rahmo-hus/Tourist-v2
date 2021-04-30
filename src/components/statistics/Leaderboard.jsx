import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Title from './Title';
import { Date } from 'prismic-reactjs';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod) {
  return { id, date, name, shipTo, paymentMethod };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  }
}));

function Leaderboard(props) {
  const classes = useStyles();
  const {leaderboard} = props;
  return (
    <React.Fragment>
    <Grid  container
  direction="row"
  justify="center"
  alignItems="center"
>
    <Title>Rang lista</Title>
    </Grid>
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Redni broj</TableCell>
            <TableCell align="right">Korisnicko ime</TableCell>
            <TableCell align="right">Osvojeni broj bodova&nbsp;</TableCell>
            <TableCell align="right">Tajanje igre&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard && leaderboard
          .map((value, key) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {key+1}
              </TableCell>
              <TableCell align="right">{value.username}</TableCell>
              <TableCell align="right">{value.score}</TableCell>
              <TableCell align="right">{new Date(value.endTime.toDate()-value.startTime.toDate()).toLocaleTimeString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}

const mapStateToProps = (state) =>{
    return{
        leaderboard: state.firestore.ordered.halloffame
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'halloffame'
        }
    ])
)(Leaderboard)