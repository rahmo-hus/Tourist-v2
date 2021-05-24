import React, {Component} from 'react';
import {Button, Fab, Paper, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {DropzoneArea} from 'material-ui-dropzone';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
        gallery: undefined
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    goBack = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    onFileChange = files => {
        this.setState({gallery: files})
    }

    handleMainImageChange = e => {
        this.setState({
            mainImg: e.target.files[0]
        })
    }

    render() {

        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container
                      direction="column"
                      justify="center"
                      spacing={2}>
                    <Grid container justify="center" alignItems="center">
                        <h1>Korak 5: Upload fotografija</h1>
                    </Grid>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <label for="contained-button-file">Naslovna fotografija</label>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleMainImageChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon/>
                            </Fab>
                        </label>
                        {this.state.mainImg &&
                        <img src={URL.createObjectURL(this.state.mainImg)} width="99%" height="50%"/>
                        }
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
                    >
                        Upload
                    </Button>
                </Grid>

                <Grid container justify="space-between">
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={this.goBack}
                    >Natrag</Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={this.continue}
                    >
                        Nastavak</Button>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(ImageGalleryForm);
