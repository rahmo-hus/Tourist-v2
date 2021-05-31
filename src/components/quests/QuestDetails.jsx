import {
    Card,
    CardContent,
    CardActions,
    Typography, CircularProgress, Button,
} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import React from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import AlertDialog from "../dialogs/QuestDeleteAlertDialog";
import FormDialog from '../dialogs/FormDialog';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ChangeQuestDialog from "../dialogs/ChangeQuestDialog";
import Carousel, {Dots} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            alignContent: "center",
        },
        title: {
            fontSize: 14,
            marginTop: "8px",
        },
        pos: {
            margin: "15px 15px 15px 0px",
        },
        image_container: {
            position: 'relative',
            height: '300px'
        },
        image: {
            objectFit: 'cover',
            objectPosition: 'center',
            height: '300px'
        },
        x_button: {
            position: 'absolute',
            top: '10px',
            right: '10px'
        }
    }
);

function QuestDetails(props) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const classes = useStyles();
    const {quest} = props;
    if (quest) {
        return (
            <div style={{justifyContent: "center"}}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography
                            align="center"
                            className={classes.pos}
                            variant="h4"
                            component="h1"
                        >
                            <Typography
                                align="center"
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                            >
                                Naslov
                            </Typography>
                            {quest.title.en_us}<br/>
                            {quest.title.sr_bih}
                        </Typography>
                        <Divider/>

                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            align="center"
                        >
                            Kratak opis
                        </Typography>
                        <Typography
                            className={classes.pos}
                            align="center"
                            variant="body2"
                            component="p"
                        >
                            {quest.gameDescription.en_us}<br/>
                            {quest.gameDescription.sr_bih}
                        </Typography>
                        <Divider/>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            align="center"
                        >
                            Opis po zavrsetku
                        </Typography>
                        <Typography
                            className={classes.pos}
                            align="center"
                            variant="body1"
                            component="p"
                        >
                            {quest.locationDescription.en_us}<br/>
                            {quest.locationDescription.sr_bih}
                        </Typography>
                        <Divider/>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            align="center"
                        >
                            Koordinate
                        </Typography>
                        <Typography
                            className={classes.pos}
                            align="center"
                            variant="body1"
                            component="p"
                        >
                            {quest.locationCoordinates.lat}°N {quest.locationCoordinates.lng}°E
                        </Typography>
                        <Divider/>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            align="center"
                        >Kategorija
                        </Typography>
                        <Typography
                            className={classes.pos}
                            align="center"
                            variant="body1"
                            component="p"
                        >   {quest.category}
                        </Typography>
                        <Divider/>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            align="center"
                        >Tezina
                        </Typography>
                        <Typography
                            className={classes.pos}
                            align="center"
                            variant="body1"
                            component="p"
                        >   {quest.difficulty}
                        </Typography>
                        {quest.headingImageURL !== "" && (
                            <>
                                <Divider/>
                                <Typography
                                    className={classes.pos}
                                    align="center"
                                    variant="body1"
                                    component="p"
                                >
                                </Typography>{" "}
                                {
                                    quest.imagesURL &&
                                    <Carousel
                                        plugins={[
                                            'arrows'
                                        ]}
                                        dynamicHeight={true}
                                        width="50%">
                                        {
                                            quest.imagesURL.map((image, key) => {
                                                return (
                                                    <div className={classes.image_container}>
                                                        <img className={classes.image} src={image} alt="photo"/>
                                                        <Button className={classes.x_button}>X</Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                }
                            </>
                        )}
                    </CardContent>
                    <CardActions>
                        <ChangeQuestDialog id={props.match.params.id} quest={quest}/>
                        <AlertDialog id={props.match.params.id}/>
                    </CardActions>
                </Card>
            </div>
        );
    } else {
        return <CircularProgress/>
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const quests = state.firestore.data.quests;
    const quest = quests ? quests[id] : null;
    return {
        quest: quest,
    };
};
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: "quests",
        },
    ])
)(QuestDetails);
