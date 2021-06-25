import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose } from 'redux'
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, TextField} from "@material-ui/core";
import QuestSummary from "./QuestSummary";

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

function QuestList(props) {

    const {quests} = props;
    const classes = useStyles();
    const [searchText, setSearchText] = React.useState('');

    const content = quests ? quests.map((quest, key) =>{
        return searchText === '' ?
            <QuestSummary quest={quest} />
            :
            quest.title.en_us.toLowerCase().includes(searchText.toLowerCase()) ||
            quest.title.sr_bih.toLowerCase().includes(searchText.toLowerCase())
                ? <QuestSummary quest={quest} /> : <></>
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
                    label="Pretraga zadataka po nazivu"
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
        quests:  state.firestore.ordered.quests
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'quests'
        }
    ])
)(QuestList)
