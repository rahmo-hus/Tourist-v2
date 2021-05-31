import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";

const useStyles = makeStyles({
        x_button: {
            position: 'absolute',
            top: '0',
            right: '0',
            background: 'rgba(255,0,0,0.3)',
            height: '40px'
        }
    }
);


export default function ImageDeleteAlertDialog() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button className={classes.x_button}
                    color="secondary"
                    variant="contained"
                    component="span"
                    onClick={handleClickOpen}>
                <CloseTwoToneIcon/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Da li ste sigurni?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Da li ste sigurni da želite obrisati ovu fotografiju?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ne
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Da
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
