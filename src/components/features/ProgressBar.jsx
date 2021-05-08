import React from 'react'
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography, withStyles } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

function ProgressBar(props) {
    return (
      <div className="mg20">
        {props.uploadProgress !== 0 && props.uploadProgress != 100 && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress
                variant="determinate"
                value={props.uploadProgress}
              />
            </Box>
            <Box minWidth={35}>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${props.uploadProgress}%`}</Typography>
            </Box>
          </Box>
        )}
      </div>
    );
}

export default ProgressBar
