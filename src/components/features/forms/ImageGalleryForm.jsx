import React, {Component} from 'react';
import {Button, Fab, Paper, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {DropzoneArea} from 'material-ui-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {connect} from "react-redux";
import {compose} from "redux";
import {uploadMultipleFiles} from "../../../store/actions/taskActions";
import UploadDialog from "../../dialogs/UploadDialog";
import {Alert} from "@material-ui/lab";

const useStyles = theme => ({
    paper: {
        padding: 16
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: 15
    },
    input: {
        display: "none"
    },
})

class ImageGalleryForm extends Component {

    state = {
        mainImg: undefined,
        gallery: undefined,
        nextButtonDisabled: true,
        uploadDisabled: false,
        imagesURL: []

    }

    onFileChange = files => {
        this.setState({gallery: files})
    }

    handleMainImageChange = e => {
        this.setState({
            mainImg: e.target.files[0]
        })
    }

    handleUploadClicked = () => {
        this.setState({uploadDisabled: true});
        this.props.uploadMultipleFiles(this.state.gallery);
    }

    render() {

        const {classes} = this.props;

        return (
            <div>
                <Grid container
                      direction="column"
                      justify="center"
                      alignContent="center"
                      spacing={2}>
                    <Grid container justify="center" alignItems="center">
                        <h1>Korak 5: Upload fotografija</h1>
                    </Grid>
                    <Grid item xs="auto">
                        {this.props.uploadSuccess === true &&
                        <Alert severity="success">Fotografije su uspješno dodane u zadatak</Alert>}
                    </Grid>
                    {/*<Grid container justify="center" alignItems="center" direction="column">*/}
                    {/*    <label for="contained-button-file">Naslovna fotografija</label>*/}
                    {/*    <input*/}
                    {/*        accept="image/*"*/}
                    {/*        className={classes.input}*/}
                    {/*        id="contained-button-file"*/}
                    {/*        type="file"*/}
                    {/*        onChange={this.handleMainImageChange}*/}
                    {/*    />*/}
                    {/*    <label htmlFor="contained-button-file">*/}
                    {/*        <Fab component="span" className={classes.button}>*/}
                    {/*            <AddPhotoAlternateIcon/>*/}
                    {/*        </Fab>*/}
                    {/*    </label>*/}
                    {/*    {this.state.mainImg &&*/}
                    {/*    <img src={URL.createObjectURL(this.state.mainImg)} width="99%" height="50%"/>*/}
                    {/*    }*/}
                    {/*</Grid>*/}
                    <Grid item xs>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Prevuci fotografije za galeriju ili klikni ovdje"}
                            filesLimit={10}
                            onChange={(files) => this.onFileChange(files)}
                        />
                    </Grid>
                </Grid>

                <Grid container
                      justify="center"
                      alignItems="center">
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon/>}
                        onClick={this.handleUploadClicked}
                        disabled={this.state.uploadDisabled}
                    >
                        Upload
                    </Button>
                </Grid>


                {this.state.uploadDisabled === true && this.props.uploadSuccess===false ? <UploadDialog open={true} /> :
                <UploadDialog open={false} />}

                {/*<Grid container justify="space-between">*/}
                {/*    <Button*/}
                {/*        className={classes.button}*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        onClick={this.goBack}*/}
                {/*    >Natrag</Button>*/}
                {/*    <Button*/}
                {/*        className={classes.button}*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        disabled={this.state.nextButtonDisabled}*/}
                {/*        onClick={this.continue}*/}
                {/*    >*/}
                {/*        Nastavak</Button>*/}
                {/*</Grid>*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.quest.error,
        uploadProgress: state.quest.uploadProgress,
        uploadSuccess: state.quest.uploadSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadMultipleFiles: files => dispatch(uploadMultipleFiles(files))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(ImageGalleryForm);
