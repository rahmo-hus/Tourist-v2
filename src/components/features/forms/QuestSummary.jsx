import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button, Paper, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Flag from 'react-flagkit';

const useStyles = theme => ({
    paper: {
        padding: 16
    },
    text: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    button: {
        margin: 15
    }
})

class QuestSummary extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    goBack = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {

        const {classes, values} = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container
                      justify="center"
                      alignItems="space-between">

                    <Grid item>
                        <h1>Korak 6: Pregled unesenih parametara</h1>
                    </Grid>

                    <Grid container justify="center">
                        <Typography className={classes.text} variant="h5">
                           Naslov
                        </Typography>
                        <Grid item xs={12}>
                            <Typography component="p" className={classes.text} variant="subtitle1">
                                <Flag country="BA"/> {values.title.sr_bih}
                            </Typography>
                            <Typography className={classes.text} variant="subtitle1">
                                <Flag country="US"/> {values.title.sr_bih}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Typography className={classes.text} variant="h5">
                            Opis igre
                        </Typography>
                        <Grid item xs={12}>
                            <Typography className={classes.text} variant="subtitle1">
                                <Flag country="BA"/> {values.gameDescription.sr_bih}
                            </Typography>
                            <Typography className={classes.text} variant="subtitle1">
                                <Flag country="US"/> {values.gameDescription.en_us}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Typography className={classes.text} variant="h5">
                            Opis lokacije
                        </Typography>
                        <Grid item xs={12}>
                            <Typography className={classes.text} component="p" variant="subtitle1">
                                <Flag country="BA"/> {values.locationDescription.sr_bih}
                            </Typography>
                            <Typography className={classes.text} variant="subtitle1">
                                <Flag country="US"/> {values.locationDescription.en_us}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container
                      direction="row">
                    <Typography className={classes.text} variant="h5">
                        <p>Kategorija zadatka : <b>{values.category}</b>, tezina zadatka: <b>{values.difficulty}</b></p>
                    </Typography>
                </Grid>

                <Grid container
                      direction="column">
                    <img src={values.headingImageURL}/>
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

export default withStyles(useStyles)(QuestSummary);
