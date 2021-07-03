import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import QuestSummary from "./QuestSummary";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    },
    searchBar: {
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 25
    }
}));

function QuestList(props) {

    const {quests} = props;
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('razno');

    const content = quests ? quests.map((quest, key) => {
        return searchText === '' && selectedCategory === 'razno' ?
            <QuestSummary quest={quest}/>
            :
            (quest.title.en_us.toLowerCase().includes(searchText.toLowerCase()) ||
            quest.title.sr_bih.toLowerCase().includes(searchText.toLowerCase())) &&
            (selectedCategory === 'razno' || quest.category === selectedCategory)
                ? <QuestSummary quest={quest}/> : <></>
    }) : (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    )

    const handleChange = event => {
        setSearchText(event.target.value)
    }

    const handleCategoryChange = event =>{
        setSelectedCategory(event.target.value)
    }

    return (
        <div style={{padding: 16}}>
            <Grid container spacing={2} justify="center" direction="row">

                <Grid item xs={10}>
                    <TextField
                        className={classes.searchBar}
                        id="outlined-search"
                        fullWidth
                        label="Pretraga zadataka po nazivu"
                        onChange={handleChange}
                        type="search"
                        variant="outlined"/>
                </Grid>
                <Grid item xs={2}>
                    <Grid container justify="center">
                    <FormControl>
                        <InputLabel id="category-label-id">Kategorija</InputLabel>
                        <Select
                            fullWidth
                            labelId="category-label-id"
                            id="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value={"razno"}>Razno</MenuItem>
                            <MenuItem value={"kulturni"}>Kulturni</MenuItem>
                            <MenuItem value={"historijski"}>Historijski</MenuItem>
                            <MenuItem value={"priroda"}>Priroda</MenuItem>
                            <MenuItem value={"umjetnost"}>Umjetnost</MenuItem>
                            <MenuItem value={"sport"}>Sport</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                {content}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        quests: state.firestore.ordered.quests
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
