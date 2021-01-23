import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddTaskForm from "../layout/forms/AddTaskForm";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { task, id } = props;
  const [taskProperties, setTaskProperties] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
    setTaskProperties(task);
    //console.log(taskProperties);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTaskProperties({
      ...taskProperties,
      [event.target.id]: event.target.value,
    });
  };

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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Odustani
          </Button>
          <Button onClick={handleClose} color="primary">
            Potvrdi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
