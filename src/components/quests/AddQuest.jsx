import React, {Component} from "react";
import DifficultyAndCategoryForm from "../features/forms/DifficultyAndCategoryForm";
import QuestInfoForm from "../features/forms/QuestInfoForm";
import LocationPin from "../features/forms/LocationPin";
import Grid from "@material-ui/core/Grid";
import ImageGalleryForm from "../features/forms/ImageGalleryForm";
import QuestSummary from "../features/forms/QuestSummary";
import {createTask, restoreDefaults, uploadFile} from "../../store/actions/taskActions";
import {connect} from "react-redux";

class AddQuest extends React.Component {

    state = {
        step: 1,
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
        headingImageURL:'',
        imagesURL: [],
        category: '',
        difficulty: 1
    }

    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleChange = input => e => {
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

    setHeadingImageURL = url =>{
        this.setState({
            headingImageURL:url
        });
    }

    addGalleryImageURLs= urls =>{

        this.setState({
            imagesURL : urls
        })

    }

    submitQuest = () =>{
        this.props.createTask({
            ...this.state
        })
    }


    render() {
        const {step} = this.state;
        const {
            title, gameDescription, category, locationCoordinates,
            imagesURL, headingImageURL, locationDescription, difficulty
        } = this.state;
        const values = {
            title, gameDescription, category, locationCoordinates,
            imagesURL, headingImageURL, locationDescription, difficulty
        };

        switch (step) {
            case 1:
                return (
                    <DifficultyAndCategoryForm
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return <div>
                    <QuestInfoForm
                        heading="Korak 2: Unos na engleskom jeziku"
                        title={values.title.en_us}
                        locationDescription={values.locationDescription.en_us}
                        gameDescription={values.gameDescription.en_us}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleLocationDescriptionChange={this.handleLocationDescriptionEn}
                        handleTitleChange={this.handleTitleChangeEn}
                        handleGameDescriptionChange={this.handleGameDescriptionChangeEn}
                    />
                    {console.log(this.state)}
                </div>

            case 3:
                return <div>
                    <QuestInfoForm
                        heading="Korak 3: Unos na maticnom jeziku"
                        title={values.title.sr_bih}
                        locationDescription={values.locationDescription.sr_bih}
                        gameDescription={values.gameDescription.sr_bih}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleLocationDescriptionChange={this.handleLocationDescriptionBih}
                        handleTitleChange={this.handleTitleChangeBih}
                        handleGameDescriptionChange={this.handleGameDescriptionChangeBih}
                    />
                </div>
            case 4:
                return <LocationPin
                    prevStep={this.prevStep}
                    nextStep={this.nextStep}
                    locationCoordinates={locationCoordinates}
                    handleCoordinates={this.handleCoordinates}/>
            case 5:
                return <ImageGalleryForm
                    prevStep={this.prevStep}
                    nextStep={this.nextStep}
                    setHeadingImageURL={this.setHeadingImageURL}
                    addGalleryImageURLs={this.addGalleryImageURLs}
                />
            case 6:
                return <QuestSummary
                    prevStep={this.prevStep}
                    nextStep={this.nextStep}
                    values = {values}
                    submitQuest = {this.submitQuest}
                />
        }

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (task) => dispatch(createTask(task))
    };
};

const mapStateToProps = (state) => {
    return {
        error: state.task.error,
        inProgress: state.task.inProgress,
        addTaskSuccess: state.task.success,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuest);
