import React, {Component} from 'react';
import {Button, withStyles} from "@material-ui/core";
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
        gallery: [],
        nextButtonDisabled: true,
        uploadDisabled: false,
        imagesURL: []

    }

    onFileChange = files => {
        this.setState({gallery: files})
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
                    <br/>
                    <Grid container justify="center" alignItems="center">
                        <h1>Upload fotografija</h1>
                    </Grid>
                    <Grid item xs="auto">
                        {this.props.uploadSuccess === true &&
                        <Alert severity="success">Fotografije su uspješno dodane u zadatak</Alert>}
                    </Grid>
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
                        disabled={this.state.uploadDisabled || this.state.gallery.length === 0}
                    >
                        Upload
                    </Button>
                </Grid>


                {this.state.uploadDisabled === true && this.props.uploadSuccess === false ?
                    <UploadDialog open={true}/> :
                    <UploadDialog open={false}/>}

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
