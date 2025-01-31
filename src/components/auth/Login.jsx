import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'
import {Alert} from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    warning:{
        width: '100%',
        '& > * * *':{
            marginTop:theme.spacing(2)
        }
    }
}));

function SignIn(props) {
    const classes = useStyles();
    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const {authError} = props;


    function handleSubmit(event) {
        event.preventDefault();
        props.signIn({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Tourist - prijava na sistem
                </Typography>
                {authError && <Alert className={classes.warning} severity="warning" fullWidth>{authError}</Alert> }
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email adresa"
                        name="email"
                        autoComplete="email"
                        inputRef={emailRef}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Lozinka"
                        type="password"
                        id="password"
                        inputRef={passwordRef}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={props.inProgress}
                    >
                        Prijava
                    </Button>
                    <Grid container style={{textAlign: "center"}}>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2">
                                Zaboravili ste šifru?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        authError: state.auth.authError,
        inProgress: state.auth.inProgress
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
