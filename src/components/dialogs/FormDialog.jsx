import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {updateQuest, uploadFile} from "../../store/actions/taskActions"
import DialogTitle from "@material-ui/core/DialogTitle";
import AddTaskForm from "../features/forms/AddTaskForm";
import { connect } from "react-redux";
import ProgressBar from "../features/utils/ProgressBar";
import UploadBox from "../features/utils/UploadBox";

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { task, id } = props;
  const [fileChangeClicked, setFileChangeClicked] = React.useState(false);
  const [taskProperties, setTaskProperties] = React.useState({});
  const [imgURL, setImgURL] = React.useState('')
  const handleClickOpen = () => {
    setOpen(true);
    setTaskProperties(task);
    setImgURL(props.task.imageURL);
    setFileChangeClicked(false);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskProperties(task);
    setFileChangeClicked(false);
  };

  const handleChange = (event) => {
    setTaskProperties({
      ...taskProperties,
      [event.target.id]: event.target.value,
    });
  };

  const handleConfirm = () =>{
      props.updateTask({
        ...taskProperties,
        imageURL:props.imageURL
      }, id);
  }

  const handleFileChange = (event) =>{
      props.uploadFile(event.target.files[0]);
      setFileChangeClicked(true);
      setImgURL('')
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
      >
        <DialogTitle id="form-dialog-title">Izmjeni</DialogTitle>
        <DialogContent>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <AddTaskForm task={taskProperties} handleChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <ProgressBar uploadProgress={props.uploadProgress} />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <UploadBox handleFileChange={handleFileChange} />
            </Grid>
            <Grid container justify="center" alignItems="center">
              {!fileChangeClicked ? (
                imgURL !== "" ? (
                  <a href={imgURL} target="_blank">
                    <img src={imgURL} alt="photo" width="300" />
                  </a>
                ) : (
                  <p>Nije dodana nijedna fotografija</p>
                )
              ) : props.imageURL !== "" ? (
                <a href={props.imageURL} target="_blank">
                  <img src={props.imageURL} alt="photo" width="300" />
                </a>
              ) : (
                <p>Nije dodana nijedna fotografija</p>
              )}
            </Grid>
          </Grid>
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

const mapDispatchToProps = (dispatch) =>{
  return{
    updateTask: (task, id) => dispatch(updateQuest(task, id)),
    uploadFile: (file) => dispatch(uploadFile(file)),
  }
}

const mapStateToProps = (state) =>{
  return{
    uploadProgress : state.task.uploadProgress,
    imageURL : state.task.imageURL,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
