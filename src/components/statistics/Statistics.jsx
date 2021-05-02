import React, { Component} from 'react';
import {CanvasJSChart, CanvasJS} from 'canvasjs-react-charts'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose } from 'redux'
import {
  Typography,
  Paper,
  Box,
  Tab,
  Tabs,
  AppBar
} from "@material-ui/core";
import PropTypes from 'prop-types';
import Leaderboard from './Leaderboard';
import { makeStyles } from '@material-ui/core/styles';
import VisitedLocationsChart from './VisitedLocationsChart';
import TimelineChart from "./TimelineChart";
import clsx from "clsx";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
    }
}));

function Statistics(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"  variant="fullWidth">
          <Tab label="Broj odigranih igara" {...a11yProps(0)} />
          <Tab label="Posjećene lokacije" {...a11yProps(1)} />
          <Tab label="Rang lista" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
          <Paper className={fixedHeightPaper}>
            <VisitedLocationsChart statistics={props.statistics} />
          </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Leaderboard leaderboard = {props.leaderboard} />
      </TabPanel>
      <TabPanel value={value} index={0}>
          <Paper className={fixedHeightPaper} >
            <TimelineChart />
          </Paper>
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) =>{
    return{
        statistics: state.firestore.ordered.statistics,
        leaderboard: state.firestore.ordered.halloffame
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
        }
    ])
)(Statistics)
