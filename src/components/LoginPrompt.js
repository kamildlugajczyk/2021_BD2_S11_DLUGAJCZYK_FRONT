import React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Container, CssBaseline, makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textInput: {
        marginBottom: theme.spacing(1)
    }
}));

export default function LoginPrompt() {
    const classes = useStyles();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [errorFlag, setErrorFlag] = useState(false);
    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error");

    function doLogin() {
        axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            data: {
                login: login,
                password: password
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            setSnackbarOpenFlag(false);
            setErrorFlag(false);
            localStorage.setItem(`AUTH_TOKEN`, response.data);
            // fetching user permissions and storing them in localStorage
            // localStorage can be modified by the user but this would only allow rendering of admin options
            axios({
                method: "GET",
                url: "http://localhost:5000/my-permissions",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("AUTH_TOKEN")
                }
            })
            .then((response2) => {
                localStorage.setItem("user-permissions", response2.data.permissions);
                window.location.reload();
            })
            .catch(() => {
                setErrorMessage("Login failed (perm)")
                setSnackbarOpenFlag(true);
                setErrorFlag(true);
            })
            
        })
        .catch(() => {
            setErrorMessage("Login failed (main)")
            setSnackbarOpenFlag(true);
            setErrorFlag(true);
        });
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
        setErrorFlag(false);
    }

    return (
        <div>
            <Container component="main" maxwidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form>
                        <TextField
                            error={errorFlag}
                            className={classes.textInput}
                            id="login"
                            label="Login"
                            name="login"
                            variant="outlined"
                            required
                            fullWidth
                            autoComplete="login"
                            onChange={(l) => { setLogin(l.target.value) }}
                        />
                        <TextField
                            error={errorFlag}
                            className={classes.textInput}
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            autoComplete="current-password"
                            onChange={(l) => { setPassword(l.target.value) }}
                        />
                        <Button
                            onClick={doLogin}
                            variant="contained"
                            fullWidth
                        >
                            Login
                    </Button>
                    </form>
                </div>
            </Container>
            <Snackbar
                open={snackbarOpenFlag}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}