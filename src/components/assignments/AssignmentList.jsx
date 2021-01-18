import React from 'react';;
import Grid from '@material-ui/core/Grid';
import AssignmentSummary from './AssignmentSummary';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose } from 'redux'
//glue library

function ViewAssignment(props) {
    const {tasks} = props;
    const content = tasks ? tasks.map((task) =>{
        return <AssignmentSummary task={task} /> 
    }) : <></>
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
