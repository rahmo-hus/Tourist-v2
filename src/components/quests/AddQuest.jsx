import React, {Component} from "react";
import DifficultyAndCategoryForm from "../features/forms/DifficultyAndCategoryForm";
import QuestInfoForm from "../features/forms/QuestInfoForm";
import LocationPin from "../features/forms/LocationPin";
import ImageGalleryForm from "../features/forms/ImageGalleryForm";
import QuestSummary from "../features/forms/QuestSummary";
import {createTask, restoreDefaults, uploadFile} from "../../store/actions/taskActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import MainForm from "../features/forms/MainForm";

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
        headingImageURL: '',
        imagesURL: [],
        category: 'historijski',
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
        for(let url of urls){
            imagesURL.push(url);
        }

        this.setState({
            imagesURL
        })
    }

    submitQuest = event => {

        this.props.createQuest({
            ...this.state,
            imagesURL: this.props.images,
            headingImageURL: this.props.headingImageURL
        })
    }


    render() {
        const {
            title, gameDescription, category, locationCoordinates,
            imagesURL, headingImageURL, locationDescription, difficulty
        } = this.state;
        const values = {
            title, gameDescription, category, locationCoordinates,
            imagesURL, headingImageURL, locationDescription, difficulty,
        };

        return (
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

                {/*<form autoComplete="off" onSubmit={this.submitQuest}>*/}
                {/*    <DifficultyAndCategoryForm values={values} handleChange={this.handleChange}/>*/}
                {/*    <QuestInfoForm*/}
                {/*        heading="Korak 2: Unos na engleskom jeziku"*/}
                {/*        title={values.title.en_us}*/}
                {/*        locationDescription={values.locationDescription.en_us}*/}
                {/*        gameDescription={values.gameDescription.en_us}*/}
                {/*        handleLocationDescriptionChange={this.handleLocationDescriptionEn}*/}
                {/*        handleTitleChange={this.handleTitleChangeEn}*/}
                {/*        handleGameDescriptionChange={this.handleGameDescriptionChangeEn}*/}
                {/*    />*/}
                {/*    <QuestInfoForm*/}
                {/*        heading="Korak 3: Unos na maticnom jeziku"*/}
                {/*        title={values.title.sr_bih}*/}
                {/*        locationDescription={values.locationDescription.sr_bih}*/}
                {/*        gameDescription={values.gameDescription.sr_bih}*/}
                {/*        handleLocationDescriptionChange={this.handleLocationDescriptionBih}*/}
                {/*        handleTitleChange={this.handleTitleChangeBih}*/}
                {/*        handleGameDescriptionChange={this.handleGameDescriptionChangeBih}*/}
                {/*    />*/}
                {/*    <LocationPin*/}
                {/*        locationCoordinates={locationCoordinates}*/}
                {/*        handleCoordinates={this.handleCoordinates}/>*/}
                {/*    <ImageGalleryForm*/}
                {/*        setHeadingImageURL={this.setHeadingImageURL}*/}
                {/*        addGalleryImageURLs={this.addGalleryImageURLs}*/}
                {/*    />*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <Button*/}
                {/*            variant="contained"*/}
                {/*            color="primary"*/}
                {/*            type="submit"*/}
                {/*        >*/}
                {/*            Potvrdi</Button>*/}
                {/*    </Grid>*/}
                {/*</form>*/}
            </Grid>
        )
        // switch (step) {
        //     case 1:
        //         return (
        //             <DifficultyAndCategoryForm
        //                 nextStep={this.nextStep}
        //                 handleChange={this.handleChange}
        //                 values={values}
        //             />
        //         )
        //     case 2:
        //         return <div>
        //             <QuestInfoForm
        //                 heading="Korak 2: Unos na engleskom jeziku"
        //                 title={values.title.en_us}
        //                 locationDescription={values.locationDescription.en_us}
        //                 gameDescription={values.gameDescription.en_us}
        //                 nextStep={this.nextStep}
        //                 prevStep={this.prevStep}
        //                 handleLocationDescriptionChange={this.handleLocationDescriptionEn}
        //                 handleTitleChange={this.handleTitleChangeEn}
        //                 handleGameDescriptionChange={this.handleGameDescriptionChangeEn}
        //             />
        //             {console.log(this.state)}
        //         </div>
        //
        //     case 3:
        //         return <div>
        //             <QuestInfoForm
        //                 heading="Korak 3: Unos na maticnom jeziku"
        //                 title={values.title.sr_bih}
        //                 locationDescription={values.locationDescription.sr_bih}
        //                 gameDescription={values.gameDescription.sr_bih}
        //                 nextStep={this.nextStep}
        //                 prevStep={this.prevStep}
        //                 handleLocationDescriptionChange={this.handleLocationDescriptionBih}
        //                 handleTitleChange={this.handleTitleChangeBih}
        //                 handleGameDescriptionChange={this.handleGameDescriptionChangeBih}
        //             />
        //         </div>
        //     case 4:
        //         return <LocationPin
        //             prevStep={this.prevStep}
        //             nextStep={this.nextStep}
        //             locationCoordinates={locationCoordinates}
        //             handleCoordinates={this.handleCoordinates}/>
        //     case 5:
        //         return <ImageGalleryForm
        //             prevStep={this.prevStep}
        //             nextStep={this.nextStep}
        //             setHeadingImageURL={this.setHeadingImageURL}
        //             addGalleryImageURLs={this.addGalleryImageURLs}
        //         />
        //     case 6:
        //         return <QuestSummary
        //             prevStep={this.prevStep}
        //             nextStep={this.nextStep}
        //             values = {values}
        //             submitQuest = {this.submitQuest}
        //         />
        // }

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createQuest: (quest) => dispatch(createTask(quest))
    };
};

const mapStateToProps = (state) => {
    return {
        error: state.task.error,
        inProgress: state.task.inProgress,
        addTaskSuccess: state.task.success,
        headingImageURL: state.task.imageURL,
        images: state.task.gallery
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuest);
