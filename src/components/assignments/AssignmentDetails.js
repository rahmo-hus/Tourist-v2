import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

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
});

function AssignmentDetails(props) {
  const classes = useStyles();
  const { task } = props;
  if (task) {
    return (
      <div style={{ justifyContent: "center" }}>
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
              {task.title}
            </Typography>
            <Divider />

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
              {task.gameDescription}
            </Typography>
            <Divider />
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
              {task.locationDescription}
            </Typography>
            <Divider />
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
              {task.coordinates}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Neki batn za izmjenu</Button>
          </CardActions>
        </Card>
      </div>
    );
  } else {
    return <div>Loading project</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.tasks;
  const task = tasks ? tasks[id] : {};
  return {
    task: task,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "tasks",
    },
  ])
)(AssignmentDetails);
