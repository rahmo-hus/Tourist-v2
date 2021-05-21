import React from 'react';
import Grid from '@material-ui/core/Grid';
import AssignmentSummary from './AssignmentSummary';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose } from 'redux'
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    },
    searchBar:{
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom:25
    }
}));

function ViewAssignment(props) {

    const {tasks} = props;
    const classes = useStyles();
    const [searchText, setSearchText] = React.useState('');

    const content = tasks ? tasks.map((task, key) =>{
        return searchText === '' ?
            <AssignmentSummary task={task} />
            :
                task.title.toLowerCase().includes(searchText.toLowerCase()) ? <AssignmentSummary task={task} /> : <></>
    }) : (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    )

    function handleChange(event){
        setSearchText(event.target.value)
    }
    return (
        <div style={{padding:16}}>
        <Grid container spacing ={2} justify="center" direction="column">

            <TextField
                className={classes.searchBar}
                id="outlined-search"
                label="Pretraga zadataka"
                onChange={handleChange}
                type="search"
                variant="outlined" />
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
            collection: 'tasks',
            orderBy:['title', 'asc']
        }
    ])
)(ViewAssignment)
