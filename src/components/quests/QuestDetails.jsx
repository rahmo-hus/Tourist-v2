import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import React, {useState} from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import AlertDialog from "../dialogs/QuestDeleteAlertDialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ChangeQuestDialog from "../dialogs/ChangeQuestDialog";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Grid from "@material-ui/core/Grid";
import QRCode from 'qrcode.react'

const useStyles = makeStyles(theme => ({
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
            height: '500px'
        },
        image: {
            objectFit: 'cover',
            objectPosition: 'center',
            height: '500px'
        },
        x_button: {
            position: 'absolute',
            top: '10px',
            right: '10px'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        progress: {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        }
    }
));

function QuestDetails(props) {
    const theme = useTheme()
    useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const [language, selectLanguage] = useState(10);
    const {quest} = props;


    const downloadQR = () => {
        const canvas = document.getElementById("qr-code");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = quest.title.sr_bih + '.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    if (quest) {
        return (
            <div style={{justifyContent: "center"}}>
                <Card className={classes.root}>
                    <CardContent>
                        <Grid container
                              alignContent="flex-end"
                              justify="flex-end">
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Jezik</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={language}
                                    onChange={e => selectLanguage(e.target.value)}
                                >
                                    <MenuItem value={10}>Engleski</MenuItem>
                                    <MenuItem value={20}>Srpski</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
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
                            {language === 10 ? quest.title.en_us : quest.title.sr_bih}
                        </Typography>
                        <Divider/>

                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            align="center"
                        >
                            Kratak opis igre
                        </Typography>
                        <Typography
                            className={classes.pos}
                            align="center"
                            variant="body2"
                            component="p"
                        >
                            {language === 10 ? quest.gameDescription.en_us : quest.gameDescription.sr_bih}
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
                            {language === 10 ? quest.locationDescription.en_us : quest.locationDescription.sr_bih}
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
                        <Divider/>
                        <Typography
                            className={classes.pos}
                            align="center"
                            variant="body1"
                            component="p"
                        >
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                                align="center"
                            >
                                Fotografije
                            </Typography>
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
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        }
                        <Divider/>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            align="center"
                        >
                            QR kod zadatka
                        </Typography>
                        <Grid container
                        direction="column"
                        alignContent="center">
                            <QRCode
                                id="qr-code"
                                value={props.match.params.id}
                                size={290}
                                level={"H"}
                                includeMargin={true}
                            />
                            <Button onClick={downloadQR}> Download QR code</Button>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <ChangeQuestDialog id={props.match.params.id} quest={quest}/>
                        <AlertDialog id={props.match.params.id}/>
                    </CardActions>
                </Card>
            </div>
        );
    } else {
        return <div className={classes.progress}>
            <CircularProgress />
        </div>
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
