import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
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

class LocationPin extends Component {


    render() {

        const {locationCoordinates, handleCoordinates} = this.props;

        return (
            <Grid container justify="center" direction="column">
                <Grid container justify="center">
                    <h1>Odabir lokacije na mapi</h1>
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
            </Grid>
        );
    }
}

export default withStyles(useStyles)(LocationPin);
