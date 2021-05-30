import React, {Component} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {withStyles} from '@material-ui/core/styles';
import ReactCountryFlag from "react-country-flag";

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

class QuestInfoForm extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    goBack = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {
            classes,
            handleGameDescriptionChange,
            handleTitleChange,
            handleLocationDescriptionChange,
            title,
            locationDescription,
            gameDescription
        } = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container
                      alignItems="center"
                      justify="center"
                      direction="column"
                      spacing={3}>
                    <Grid item xs>
                        <h1>{this.props.heading}</h1>
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="title"
                            value={title}
                            name="title"
                            label="Naslov"
                            variant="outlined"
                            onChange={handleTitleChange}
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            required
                            value={gameDescription}
                            multiline
                            id="gameDescription"
                            type="text"
                            name="gameDescription"
                            rows={4}
                            onChange={handleGameDescriptionChange}
                            label="Opis igre"
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            value={locationDescription}
                            multiline
                            id="locationDescription"
                            onChange={handleLocationDescriptionChange}
                            type="text"
                            rows={4}
                            label="Detaljan opis lokacije"
                        />
                    </Grid>
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
                    {/*        onClick={this.continue}*/}
                    {/*    >*/}
                    {/*        Nastavak</Button>*/}
                    {/*</Grid>*/}
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(QuestInfoForm);
