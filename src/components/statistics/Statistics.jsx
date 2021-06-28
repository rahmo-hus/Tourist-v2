import React from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {AppBar, Box, CircularProgress, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
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
    fixedHeight: {
        height: 400
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    progress: {
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
    const {games, statistics, leaderboard, quests} = props;
    if (games && statistics && leaderboard && quests) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                        <Tab label="Broj odigranih igara" {...a11yProps(0)} />
                        <Tab label="Rang lista" {...a11yProps(1)} />
                        <Tab label="Zadaci" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Paper className={fixedHeightPaper}>
                        <TimelineChart games={games}/>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Leaderboard leaderboard={leaderboard}/>
                </TabPanel>
                <TabPanel index={value} value={2}>
                    <IndividualTaskSummary quests={quests} games={games} statistics={statistics}/>
                </TabPanel>
            </div>
        );
    } else {
        return (
            <div className={classes.progress}>
                <CircularProgress/>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        statistics: state.firestore.ordered.statistics,
        leaderboard: state.firestore.ordered.halloffame,
        games: state.firestore.ordered.game,
        quests: state.firestore.ordered.quests
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'statistics'
        },
        {
            collection: 'halloffame'
        },
        {
            collection: 'game'
        },
        {
            collection: 'quests'
        }
    ])
)(Statistics)
