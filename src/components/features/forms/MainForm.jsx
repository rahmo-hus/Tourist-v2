import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import LocationPin from "./LocationPin";
import ImageGalleryForm from "./ImageGalleryForm";
import {compose} from "redux";
import {connect} from "react-redux";

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

class MainForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const classes = this.props;
        const {values} = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container
                      justify="center"
                      alignItems="center"
                      direction="column"
                      spacing={2}>
                    <Grid item xs>
                        <h1>Korak 1</h1>
                    </Grid>
                    <Grid item xs>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="difficulty-label-id">Težina</InputLabel>
                            <Select
                                labelId="difficulty-label-id"
                                id="difficulty"
                                value={values.difficulty}
                                onChange={this.props.handleDifficultyChange('difficulty')}
                            >
                                <MenuItem value={1}>Easy</MenuItem>
                                <MenuItem value={2}>Medium</MenuItem>
                                <MenuItem value={3}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <br/>
                    <Grid item xs>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="category-label-id">Kategorija</InputLabel>
                            <Select
                                labelId="category-label-id"
                                id="category"
                                value={values.category}
                                onChange={this.props.handleDifficultyChange('category')}
                            >
                                <MenuItem value={"kulturni"}>Kulturni</MenuItem>
                                <MenuItem value={"historijski"}>Historijski</MenuItem>
                                <MenuItem value={"priroda"}>Priroda</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="title_sr-bih"
                            name="title_sr-bih"
                            label="Naslov (maticni)"
                            variant="outlined"
                            value={values.title.sr_bih}
                            onChange={this.props.handleTitleChangeBih}
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="title_en-us"
                            name="title_en-us"
                            label="Naslov (engleski)"
                            variant="outlined"
                            value={values.title.en_us}
                            onChange={this.props.handleTitleChangeEn}
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            required
                            multiline
                            id="gameDescription_sr-bih"
                            type="text"
                            name="gameDescription_sr-bih"
                            rows={4}
                            value={values.gameDescription.sr_bih}
                            onChange={this.props.handleGameDescriptionChangeBih}
                            label="Opis igre (maticni)"
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            required
                            multiline
                            id="gameDescription_sr-bih"
                            type="text"
                            name="gameDescription_sr-bih"
                            value={values.gameDescription.en_us}
                            onChange={this.props.handleGameDescriptionChangeEn}
                            rows={4}
                            label="Opis igre (engleski)"
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            multiline
                            id="locationDescription_sr-bih"
                            type="text"
                            value={values.locationDescription.sr_bih}
                            onChange={this.props.handleLocationDescriptionChangeBih}
                            rows={4}
                            label="Detaljan opis lokacije (maticni)"
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            multiline
                            id="locationDescription_en-us"
                            type="text"
                            onChange={this.props.handleLocationDescriptionChangeEn}
                            value={values.locationDescription.en_us}
                            rows={4}
                            label="Detaljan opis lokacije (engleski)"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <LocationPin locationCoordinates={values.locationCoordinates}
                                 handleCoordinates={this.props.handleCoordinates}/>
                </Grid>

                <ImageGalleryForm />

                <Grid item xs={12}>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.props.submitQuest}
                    >Submit</Button>
                </Grid>

            </Paper>
        );
    }
}

export default withStyles(useStyles)(MainForm)
