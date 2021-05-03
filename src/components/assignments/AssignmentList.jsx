import React from 'react';;
import Grid from '@material-ui/core/Grid';
import AssignmentSummary from './AssignmentSummary';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose } from 'redux'
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }
}));

function ViewAssignment(props) {
    const {tasks} = props;
    const classes = useStyles();


    const content = tasks ? tasks.map((task, key) =>{
        return <AssignmentSummary task={task} />
    }) : (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    )
    return (
        <div style={{padding:16}}>
        <Grid container spacing ={2} justify="center" direction="column">
            {content}
        </Grid>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        tasks: state.firestore.ordered.tasks
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'tasks'
        }
    ])
)(ViewAssignment)
