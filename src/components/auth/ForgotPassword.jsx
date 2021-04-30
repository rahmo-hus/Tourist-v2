import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import {resetPassword} from "../../store/actions/authActions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    infoMessage: {
        width: '100%',
        '& > * * *': {
            marginTop: theme.spacing(2)
        }
    }
}));

function ForgotPassword(props) {
    const classes = useStyles()
    const emailRef = useRef()
    const [message, setMessage] = useState('')


    function handleSubmit(event) {
        event.preventDefault()
        props.resetPassword(emailRef.current.value);
        setMessage('Provjerite vaš inbox')
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{marginBottom:"5px"}}>
                    Tourist - meet BL
                </Typography>
                <div>
                    {props.resetError && <Alert className={classes.infoMessage} severity="warning" fullWidth>{props.resetError}</Alert>}
                    {!props.resetError && message && <Alert className={classes.infoMessage} severity="success" fullWidth>{message}</Alert>}
                </div>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputRef={emailRef}
                        id="email"
                        label="E-mail Adresa"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={props.inProgress}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Pošaljite link za oporavak
                    </Button>
                    <Grid container style={{ textAlign: "center" }}>
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                                Povratak na početnu stranicu
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state) =>{
    return{
        resetError: state.auth.resetError,
        inProgress: state.auth.inProgress
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        resetPassword: (email) => dispatch(resetPassword(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
