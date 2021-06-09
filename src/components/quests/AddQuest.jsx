import React, {Component} from "react";
import {createQuest, restoreDefaults, uploadFile} from "../../store/actions/taskActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {Button, makeStyles, Paper, withStyles} from "@material-ui/core";
import MainForm from "../common/forms/MainForm";
import {compose} from "redux";

const useStyles = theme => ({
    paper:{
        padding:16
    }
})

class AddQuest extends Component {

    state = {
        title: {
            en_us: '',
            sr_bih: ''
        },
        gameDescription: {
            en_us: '',
            sr_bih: ''
        },
        locationDescription: {
            en_us: '',
            sr_bih: ''
        },
        locationCoordinates: {
            lat: 44.7722,
            lng: 17.1910
        },
        category: 'historijski',
        difficulty: 1
    }


    handleDifficultyChange = input => e => {
        console.log(this.state)
        this.setState({[input]: e.target.value});
    }

    handleLocationDescriptionEn = e => {
        const {locationDescription} = this.state;
        locationDescription.en_us = e.target.value;
        this.setState({locationDescription: locationDescription});
    }

    handleLocationDescriptionBih = e => {
        const {locationDescription} = this.state;
        locationDescription.sr_bih = e.target.value;
        this.setState({locationDescription: locationDescription});
    }

    handleTitleChangeEn = e => {
        const {title} = this.state;
        title.en_us = e.target.value;
        this.setState({title: title});
    }

    handleTitleChangeBih = e => {
        const {title} = this.state;
        title.sr_bih = e.target.value;
        this.setState({title: title});
    }

    handleGameDescriptionChangeEn = e => {
        const {gameDescription} = this.state;
        gameDescription.en_us = e.target.value;
        this.setState({gameDescription: gameDescription});
    }

    handleGameDescriptionChangeBih = e => {
        const {gameDescription} = this.state;
        gameDescription.sr_bih = e.target.value;
        this.setState({gameDescription: gameDescription});
    }

    handleCoordinates = e => {
        const {locationCoordinates} = this.state;
        locationCoordinates.lat = e.lat;
        locationCoordinates.lng = e.lng;
        this.setState({locationCoordinates: locationCoordinates});
    }

    addGalleryImageURLs = urls => {
        const imagesURL = this.state.imagesURL;
        for (let url of urls) {
            imagesURL.push(url);
        }

        this.setState({
            imagesURL
        })
    }

    submitQuest = event => {

        event.preventDefault();

        this.props.createQuest({
            ...this.state,
            imagesURL: this.props.images,
        })
    }


    render() {
        const {
            title, gameDescription, category, locationCoordinates,
            locationDescription, difficulty
        } = this.state;
        const values = {
            title, gameDescription, category, locationCoordinates, locationDescription, difficulty,
        };
        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container direction="column">

                    <MainForm values={values}
                              handleCoordinates={this.handleCoordinates}
                              handleLocationDescriptionChangeEn={this.handleLocationDescriptionEn}
                              handleTitleChangeEn={this.handleTitleChangeEn}
                              handleGameDescriptionChangeEn={this.handleGameDescriptionChangeEn}
                              handleLocationDescriptionChangeBih={this.handleLocationDescriptionBih}
                              handleTitleChangeBih={this.handleTitleChangeBih}
                              handleGameDescriptionChangeBih={this.handleGameDescriptionChangeBih}
                              handleDifficultyChange={this.handleDifficultyChange}
                              submitQuest={this.submitQuest}/>
                    <Button color="primary"
                            variant="contained"
                            onClick={this.submitQuest}>
                        Submit
                    </Button>
                </Grid>
            </Paper>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createQuest: (quest) => dispatch(createQuest(quest)),
        restoreDefaults: () => dispatch(restoreDefaults())
    };
};

const mapStateToProps = (state) => {
    return {
        error: state.quest.error,
        inProgress: state.quest.inProgress,
        addTaskSuccess: state.quest.success,
        images: state.quest.gallery
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(AddQuest)