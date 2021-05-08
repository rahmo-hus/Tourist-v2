import { Grid, TextField } from '@material-ui/core';
import React from 'react'

function AddTaskForm(props) {
    const {task} = props;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="title"
            value={task.title}
            name="title"
            label="Naziv zadatka"
            variant="outlined"
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            required
            value={task.gameDescription}
            multiline
            id="gameDescription"
            type="text"
            name="gameDescription"
            rows={4}
            onChange={props.handleChange}
            label="Opis igre"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="coordinates"
            required
            value={task.coordinates}
            name="lat"
            variant="outlined"
            onChange={props.handleChange}
            label="Koordinate lokacije"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            variant="outlined"
            value={task.locationDescription}
            multiline
            id="locationDescription"
            onChange={props.handleChange}
            type="text"
            name="locationDescription"
            rows={4}
            label="Opis lokacije (po zavrsetku)"
          />
        </Grid>
      </Grid>
    );
}

export default AddTaskForm
