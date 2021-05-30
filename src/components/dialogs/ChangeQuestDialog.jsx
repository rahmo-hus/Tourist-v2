import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {updateTask, uploadFile} from "../../store/actions/taskActions"
import DialogTitle from "@material-ui/core/DialogTitle";
import AddTaskForm from "../features/forms/AddTaskForm";
import {connect} from "react-redux";
import ProgressBar from "../features/utils/ProgressBar";
import UploadBox from "../features/utils/UploadBox";
import QuestInfoForm from "../features/forms/QuestInfoForm";
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import MainForm from "../features/forms/MainForm";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function ChangeQuestDialog(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const {quest, id} = props;
    const [fileChangeClicked, setFileChangeClicked] = React.useState(false);
    const [taskProperties, setTaskProperties] = React.useState({});
    const [imgURL, setImgURL] = React.useState('')
    const handleClickOpen = () => {
        setOpen(true);
        setTaskProperties(quest);
        //setImgURL(props.task.imageURL);
        setFileChangeClicked(false);
        console.log(quest);
    };

    const handleClose = () => {
        setOpen(false);
        setTaskProperties(quest);
        setFileChangeClicked(false);
    };

    const handleDifficultyChange = input => e => {
        setTaskProperties({
            ...taskProperties,
            [input]: e.target.value
        });

    }

    const handleTitleChangeBih = e => {
        setTaskProperties({
            ...taskProperties,
            title: {
                ...taskProperties.title,
                sr_bih: e.target.value
            }
        });
    }
    const handleTitleChangeEn = e => {
        setTaskProperties({
            ...taskProperties,
            title: {
                ...taskProperties.title,
                en_us: e.target.value
            }
        });
    }

    const handleLocationDescriptionChangeEn = e => {
        setTaskProperties({
            ...taskProperties,
            locationDescription: {
                ...taskProperties.locationDescription,
                en_us: e.target.value
            }
        });
    }

    const handleLocationDescriptionChangeBih = e => {
        setTaskProperties({
            ...taskProperties,
            locationDescription: {
                ...taskProperties.locationDescription,
                sr_bih: e.target.value
            }
        });
    }

    const handleGameDescriptionChangeEn = e => {
        setTaskProperties({
            ...taskProperties,
            gameDescription: {
                ...taskProperties.gameDescription,
                en_us: e.target.value
            }
        });
    }

    const handleGameDescriptionChangeBih = e => {
        setTaskProperties({
            ...taskProperties,
            gameDescription: {
                ...taskProperties.gameDescription,
                sr_bih: e.target.value
            }
        });
    }

    const handleChange = (event) => {
        setTaskProperties({
            ...taskProperties,
            [event.target.id]: event.target.value,
        });
    };

    const handleConfirm = () => {
        props.updateTask({
            ...taskProperties,
            imageURL: props.imageURL
        }, id);
    }

    const handleCoordinates = e =>{
        setTaskProperties({
            ...taskProperties,
            locationCoordinates:{
                lat:e.lat,
                lng:e.lng
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

                    <MainForm values={taskProperties}
                              handleDifficultyChange={handleDifficultyChange}
                              handleTitleChangeBih={handleTitleChangeBih}
                              handleTitleChangeEn={handleTitleChangeEn}
                              handleLocationDescriptionChangeEn={handleLocationDescriptionChangeEn}
                              handleLocationDescriptionChangeBih={handleLocationDescriptionChangeBih}
                              handleGameDescriptionChangeBih={handleGameDescriptionChangeBih}
                              handleGameDescriptionChangeEn={handleGameDescriptionChangeEn}
                              handleCoordinates={handleCoordinates}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Odustani
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            handleConfirm();
                        }}
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
        updateTask: (task, id) => dispatch(updateTask(task, id)),
        uploadFile: (file) => dispatch(uploadFile(file)),
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeQuestDialog)
