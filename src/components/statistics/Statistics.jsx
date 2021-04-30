import React, { Component} from 'react';
import {CanvasJSChart, CanvasJS} from 'canvasjs-react-charts'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose } from 'redux'
import {
  Card,
  CardContent,
  CardActions,
  Button,
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
import { spacing } from '@material-ui/system';
import VisitedLocationsChart from './VisitedLocationsChart';


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
        <Box p={3}>
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
}));

function Statistics(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"  variant="fullWidth">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <VisitedLocationsChart statistics={props.statistics} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) =>{
    return{
        statistics: state.firestore.ordered.statistics
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'statistics'
        }
    ])
)(Statistics)