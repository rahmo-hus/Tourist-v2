import React from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {AppBar, Box, CircularProgress, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import VisitedLocationsChart from './VisitedLocationsChart';
import TimelineChart from "./TimelineChart";
import clsx from "clsx";
import IndividualTaskSummary from "./IndividualTaskSummary";
import Leaderboard from "./Leaderboard";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingTop={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
    fixedHeight:{
      height:400
    },
    paper:{
      padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    progress:{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }
}));

function Statistics(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const {games, statistics, leaderboard, tasks} = props;
    if(games && statistics && leaderboard && tasks) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                        <Tab label="Broj odigranih igara" {...a11yProps(0)} />
                        <Tab label="Posjećene lokacije" {...a11yProps(1)} />
                        <Tab label="Rang lista" {...a11yProps(2)} />
                        <Tab label="Zadaci" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Paper className={fixedHeightPaper}>
                        <TimelineChart games={games}/>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Paper className={fixedHeightPaper}>
                        <VisitedLocationsChart statistics={statistics}/>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={2}>
                        <Leaderboard leaderboard = {leaderboard}/>
                </TabPanel>
                <TabPanel index={value} value={3}>
                   <IndividualTaskSummary tasks={tasks} games={games}/>
                </TabPanel>
            </div>
        );
    }
    else
    {
        return (
            <div className={classes.progress}>
                <CircularProgress />
            </div>)
    }
}

const mapStateToProps = (state) =>{
    return{
        statistics: state.firestore.ordered.statistics,
        leaderboard: state.firestore.ordered.halloffame,
        games: state.firestore.ordered.game,
        tasks: state.firestore.ordered.tasks
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection:'statistics'
        },
        {
            collection:'halloffame',
            orderBy:['score', 'desc']
        },
        {
            collection:'game'
        },
        {
            collection:'tasks'
        }
    ])
)(Statistics)
