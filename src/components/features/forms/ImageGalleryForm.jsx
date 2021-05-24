import React, {Component} from 'react';
import {Button, Paper, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Files from "react-butterfiles";

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
    }
})

class ImageGalleryForm extends Component {

    state = {
        mainImg: undefined,
        gallery: undefined,
        errors: undefined
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    goBack = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    onFileChange = e => {
        const files = Array.from(e.target.files);
        this.setState({
            gallery: files
        });

    }

    render() {

        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container direction="column" justify="center">
                    <input type="file" multiple accept="image/jpeg, image/png"
                           required onChange={this.onFileChange.bind(this)}/>
                    <br/>
                    <Files
                        multiple
                        convertToBase64
                        accept={["image/jpg", "image/jpeg", "image/png"]}
                        onError={this.handleErrors}
                        onSuccess={files =>
                            // Will append images at the end of the list.
                            this.handleFiles(files, this.state.files.length)
                        }
                    >
                        {({ browseFiles, getDropZoneProps }) => (
                            <div
                                {...getDropZoneProps({
                                    className:
                                        gallery + (this.state.dragging ? " dragging" : ""),
                                    onDragEnter: () => this.setState({ dragging: true }),
                                    onDragLeave: () => this.setState({ dragging: false }),
                                    onDrop: () => this.setState({ dragging: false })
                                })}
                            >
                                <ul>
                                    {this.state.files.map((image, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                browseFiles({
                                                    onErrors: this.handleErrors,
                                                    onSuccess: files => {
                                                        // Will insert images after the clicked image.
                                                        this.handleFiles(files, index + 1);
                                                    }
                                                });
                                            }}
                                        >
                                            <img src={image.src} />
                                        </li>
                                    ))}
                                    <li
                                        className="new-image"
                                        onClick={() => {
                                            browseFiles({
                                                onErrors: this.handleErrors,
                                                onSuccess: files => {
                                                    // Will append images at the end of the list.
                                                    this.handleFiles(
                                                        files,
                                                        this.state.files.length
                                                    );
                                                }
                                            });
                                        }}
                                    >
                                        <div>+</div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </Files>
                    {this.state.errors.length > 0 && <div>An error occurred.</div>}
                </Grid>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        {this.state.gallery && this.state.gallery.map((file, key) => {
                            return <img src={URL.createObjectURL(file)} width="100%" height="auto"/>
                        })}
                    </Grid>
                </Grid>
                <Grid container justify="space-between">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.goBack}
                    >Natrag</Button>
                    <Button
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
