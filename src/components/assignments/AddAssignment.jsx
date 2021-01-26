import { Button, Grid, Paper } from "@material-ui/core";
import React from "react";
import {
  createTask,
  uploadFile,
  restoreDefaults,
} from "../../store/actions/taskActions";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import ProgressBar from "../layout/ProgressBar";
import UploadBox from "../layout/UploadBox";
import AddTaskForm from "../layout/forms/AddTaskForm";

const initState = {
  title: "",
  gameDescription: "",
  coordinates: "",
  locationDescription: "",
};

class AddAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(initState);
    this.props.restoreDefaults();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createTask({
      ...this.state,
      imageURL: this.props.imageURL,
    });
  };
  resetState = () => {
    this.setState(Object.assign(initState));
  };

  handleFileChange = (event) => {
    console.log(event.target.files[0]);
    this.props.uploadFile(event.target.files[0]);
  };
  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        {this.props.error && (
          <Alert severity="danger">{this.props.error}</Alert>
        )}
        {this.props.addTaskSuccess !== "" && (
          <Alert style={{ justify: "center" }} severity="success">
            {this.props.addTaskSuccess}
          </Alert>
        )}
        <Paper style={{ padding: 16 }}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <AddTaskForm task={this.state} handleChange={this.handleChange} />
            </Grid>
            <Grid item xs={12}>
              <ProgressBar uploadProgress={this.props.uploadProgress} />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <UploadBox handleFileChange={this.handleFileChange} />
            </Grid>
            <Grid container justify="center" alignItems="center">
              {this.props.imageURL !== "" ? (
                <a href={this.props.imageURL} target="_blank">
                  <img src={this.props.imageURL} alt="photo" width="300" />
                </a>
              ) : (
                <p>Nije dodana nijedna fotografija</p>
              )}
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={this.props.inProgress}
              >
                Dodaj zadatak
              </Button>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={this.resetState}
              >
                Očisti polja
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (task) => dispatch(createTask(task)),
    uploadFile: (file) => dispatch(uploadFile(file)),
    restoreDefaults: () => dispatch(restoreDefaults()),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.task.error,
    inProgress: state.task.inProgress,
    addTaskSuccess: state.task.success,
    uploadProgress: state.task.uploadProgress,
    imageURL: state.task.imageURL,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAssignment);
