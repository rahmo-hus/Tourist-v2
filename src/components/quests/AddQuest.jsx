import React, {Component} from "react";
import {createQuest, restoreDefaults} from "../../store/actions/taskActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {Button, Paper, withStyles} from "@material-ui/core";
import MainForm from "../common/forms/MainForm";
import {compose} from "redux";
import {Alert} from "@material-ui/lab";

const useStyles = theme => ({
    paper: {
        padding: 16
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
        rating: [],
        submitted : false
    }


    handleCategoryChange = input => e => {
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
        this.setState({submitted: true});
        const {submitted, ...questState} = this.state;

        this.props.createQuest({
            ...questState,
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
                <form autoComplete="off" onSubmit={this.submitQuest}>
                    <Grid container direction="column">

                        <MainForm values={values}
                                  handleCoordinates={this.handleCoordinates}
                                  handleLocationDescriptionChangeEn={this.handleLocationDescriptionEn}
                                  handleTitleChangeEn={this.handleTitleChangeEn}
                                  handleGameDescriptionChangeEn={this.handleGameDescriptionChangeEn}
                                  handleLocationDescriptionChangeBih={this.handleLocationDescriptionBih}
                                  handleTitleChangeBih={this.handleTitleChangeBih}
                                  handleGameDescriptionChangeBih={this.handleGameDescriptionChangeBih}
                                  handleCategoryChange={this.handleCategoryChange}
                                  submitQuest={this.submitQuest}/>

                        {this.props.addQuestSuccess && <Alert severity="success">Uspješno dodan zadatak</Alert> }
                        <br/>

                        <Button color="primary"
                                variant="contained"
                                type="submit"
                                disabled = {this.state.submitted}>
                            Submit
                        </Button>
                    </Grid>
                </form>
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
        addQuestSuccess: state.quest.success,
        images: state.quest.gallery
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(AddQuest)
