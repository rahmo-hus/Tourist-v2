import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import LocationPin from "./LocationPin";
import ImageGalleryForm from "./ImageGalleryForm";

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
            <div>
                <Grid container
                      justify="center"
                      alignItems="center"
                      direction="column"
                      spacing={2}>
                    <Grid item xs>
                        <h1>Unos osnovnih podataka</h1>
                    </Grid>
                    <br/>
                    <Grid item xs>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="category-label-id">Kategorija</InputLabel>
                            <Select
                                labelId="category-label-id"
                                id="category"
                                value={values.category}
                                onChange={this.props.handleCategoryChange('category')}
                            >
                                <MenuItem value={"kulturni"}>Kulturni</MenuItem>
                                <MenuItem value={"historijski"}>Historijski</MenuItem>
                                <MenuItem value={"priroda"}>Priroda</MenuItem>
                                <MenuItem value={"umjetnost"}>Umjetnost</MenuItem>
                                <MenuItem value={"sport"}>Sport</MenuItem>
                            </Select>
                            <br/>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="title_sr-bih"
                            name="title_sr-bih"
                            label="Naslov (srpski jezik)"
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
                            label="Naslov (engleski jezik)"
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
                            label="Opis igre (srpski jezik)"
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
                            label="Opis igre (engleski jezik)"
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
                            label="Detaljan opis lokacije (srpski jezik)"
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
                            label="Detaljan opis lokacije (engleski jezik)"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <LocationPin locationCoordinates={values.locationCoordinates}
                                 handleCoordinates={this.props.handleCoordinates}/>
                </Grid>
                <ImageGalleryForm/>
            </div>
        );
    }
}

export default withStyles(useStyles)(MainForm);

