import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Box, Button, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import Marker from "../Marker";

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

    state = {
        marker: {
            lat: 44.7722,
            lng: 17.1910
        },
        zoom: 12
    }


    handleMapClick = e => {
        const currentMarker = this.state.marker;
        currentMarker.lat = e.lat;
        currentMarker.lng = e.lng;
        this.setState({marker: currentMarker});

    }

    goBack = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {

        const {classes} = this.props;

        return (
            <Paper>
                <Grid container justify="center" direction="column">
                    <Grid container justify="center">
                        <h1>Korak 4: Odabir lokacije na mapi</h1>
                    </Grid>
                    <div style={{height: '70vh', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                            defaultCenter={this.state.marker}
                            defaultZoom={this.state.zoom}
                            yesIWantToUseGoogleMapApiInternals
                            onClick={this.handleMapClick}

                        >
                            <Marker lat={this.state.marker.lat} lng={this.state.marker.lng}/>
                        </GoogleMapReact>
                    </div>
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
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(LocationPin);
