import { Button, Fab, Grid, Paper, TextField } from "@material-ui/core";
import React from "react";
import { createTask } from "../../store/actions/taskActions";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";

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
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createTask(this.state);
  };
  resetState = () => {
    this.setState(Object.assign(initState));
  };

  handleFileChange = (event) =>{
    console.log(event.target.files[0]);
  }
  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        {this.props.error && (
          <Alert severity="danger">{this.props.error}</Alert>
        )}
        <Paper style={{ padding: 16 }}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="title"
                value={this.state.title}
                name="title"
                label="Naziv zadatka"
                variant="outlined"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                required
                value={this.state.gameDescription}
                multiline
                id="gameDescription"
                type="text"
                name="gameDescription"
                rows={4}
                onChange={this.handleChange}
                label="Opis igre"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="coordinates"
                required
                value={this.state.coordinates}
                name="lat"
                variant="outlined"
                onChange={this.handleChange}
                label="Koordinate lokacije"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                variant="outlined"
                value={this.state.locationDescription}
                multiline
                id="locationDescription"
                onChange={this.handleChange}
                type="text"
                name="locationDescription"
                rows={4}
                label="Opis lokacije (po zavrsetku)"
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
                <label htmlFor="upload-photo">
                  <br />
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={this.handleFileChange}
                  />
                  <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                </label>
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
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.task.error,
    inProgress: state.task.inProgress,
    success: state.task.success,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAssignment);