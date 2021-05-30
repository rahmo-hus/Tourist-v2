import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Box, Button, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import Marker from "../utils/Marker";

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

const AnyReactComponent = ({text}) => <div>{text}</div>;

class LocationPin extends Component {

    goBack = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {

        const {classes, locationCoordinates, handleCoordinates} = this.props;

        return (
                <Grid container justify="center" direction="column">
                    <Grid container justify="center">
                        <h1>Korak 4: Odabir lokacije na mapi</h1>
                    </Grid>
                    <div style={{height: '70vh', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                            defaultCenter={locationCoordinates}
                            defaultZoom={12}
                            yesIWantToUseGoogleMapApiInternals
                            onClick={handleCoordinates}

                        >
                            <Marker lat={locationCoordinates.lat} lng={locationCoordinates.lng}/>
                        </GoogleMapReact>
                    </div>
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
        );
    }
}

export default withStyles(useStyles)(LocationPin);
