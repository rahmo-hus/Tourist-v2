import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {updateQuest} from "../../store/actions/taskActions"
import DialogTitle from "@material-ui/core/DialogTitle";
import {connect} from "react-redux";
import {makeStyles, Paper} from "@material-ui/core";
import MainForm from "../common/forms/MainForm";
import Carousel from "@brainhubeu/react-carousel";
import ImageDeleteAlertDialog from "./ImageDeleteAlertDialog";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    image_container: {
        position: 'relative',
        height: '300px'
    },
    image: {
        objectFit: 'cover',
        objectPosition: 'center',
        height: '300px',
        maxWidth: '100%'
    },
    x_button: {
        position: 'absolute',
        top: '0',
        right: '0',
        background: 'rgba(255,0,0,0.3)',
        height: '40px'
    }
}));

function ChangeQuestDialog(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const {quest, id} = props;
    const [, setFileChangeClicked] = React.useState(false);
    const [questProperties, setQuestProperties] = React.useState({});
    const [currentGallery, setCurrentGallery] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        setQuestProperties(quest);
        setFileChangeClicked(false);
        if (currentGallery.length === 0) {
            const currentGalleryLocal = [];
            quest.imagesURL.map((image, key) => {
                currentGalleryLocal.push(image);
            })
            setCurrentGallery(currentGalleryLocal);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setQuestProperties(quest);
        setFileChangeClicked(false);
        setCurrentGallery([]);
    };

    const handleCategoryChange = input => e => {
        setQuestProperties({
            ...questProperties,
            [input]: e.target.value
        });

    }

    const handleTitleChangeBih = e => {
        setQuestProperties({
            ...questProperties,
            title: {
                ...questProperties.title,
                sr_bih: e.target.value
            }
        });
    }
    const handleTitleChangeEn = e => {
        setQuestProperties({
            ...questProperties,
            title: {
                ...questProperties.title,
                en_us: e.target.value
            }
        });
    }

    const handleLocationDescriptionChangeEn = e => {
        setQuestProperties({
            ...questProperties,
            locationDescription: {
                ...questProperties.locationDescription,
                en_us: e.target.value
            }
        });
    }

    const handleLocationDescriptionChangeBih = e => {
        setQuestProperties({
            ...questProperties,
            locationDescription: {
                ...questProperties.locationDescription,
                sr_bih: e.target.value
            }
        });
    }

    const handleGameDescriptionChangeEn = e => {
        setQuestProperties({
            ...questProperties,
            gameDescription: {
                ...questProperties.gameDescription,
                en_us: e.target.value
            }
        });
    }

    const handleGameDescriptionChangeBih = e => {
        setQuestProperties({
            ...questProperties,
            gameDescription: {
                ...questProperties.gameDescription,
                sr_bih: e.target.value
            }
        });
    }

    const handleConfirm = () => {
        const currentGalleryLocal = [];
        if (props.images) {
            props.images.map((image, key) => {
                currentGalleryLocal.push(image);
            });
        }
        currentGallery.map((image, key) => {
            currentGalleryLocal.push(image);
        });
        setOpen(false);
        props.updateQuest({
            ...questProperties,
            imagesURL: currentGalleryLocal
        }, id);
        setCurrentGallery([]);
    }

    const removeImageFromGallery = image => {
        const currentGalleryLocal = Object.assign(currentGallery);
        const index = currentGalleryLocal.indexOf(image);
        currentGalleryLocal.splice(index, 1);
        setCurrentGallery(currentGalleryLocal);
        setQuestProperties({...questProperties})
    }

    const handleCoordinates = e => {
        setQuestProperties({
            ...questProperties,
            locationCoordinates: {
                lat: e.lat,
                lng: e.lng
            }
        });
    }

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Izmjena
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
            >
                <DialogTitle id="form-dialog-title">Izmjeni</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        spacing={3}
                    >

                    </Grid>
                </DialogContent>
                <DialogContent>

                    <MainForm values={questProperties}
                              handleCategoryChange={handleCategoryChange}
                              handleTitleChangeBih={handleTitleChangeBih}
                              handleTitleChangeEn={handleTitleChangeEn}
                              handleLocationDescriptionChangeEn={handleLocationDescriptionChangeEn}
                              handleLocationDescriptionChangeBih={handleLocationDescriptionChangeBih}
                              handleGameDescriptionChangeBih={handleGameDescriptionChangeBih}
                              handleGameDescriptionChangeEn={handleGameDescriptionChangeEn}
                              handleCoordinates={handleCoordinates}
                    />
                    {
                        currentGallery &&
                        <Paper>
                            <Grid container justify="center">
                                <h1>Pregled i uklanjanje fotografija</h1>
                                <br/>
                            </Grid>
                            <Carousel
                                plugins={[
                                    'arrows'
                                ]}
                                dynamicHeight={true}
                                width="50%">
                                {
                                    currentGallery.map((image, key) => {
                                        return (
                                            <div className={classes.image_container}>
                                                <img className={classes.image} src={image} alt="photo"/>
                                                <ImageDeleteAlertDialog removeImageFromGalley={removeImageFromGallery}
                                                                        image={image}/>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </Paper>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Odustani
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        color="primary"
                    >

                        Potvrdi
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuest: (quest, id) => dispatch(updateQuest(quest, id)),
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.quest.gallery
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeQuestDialog)
