import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Container, CssBaseline, makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import config from '../config';

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);
    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error");

    // The 'doLogin' function makes the dependencies of useEffect Hook (at line 73) change on every render. To fix this, wrap the definition of 'doLogin' in its own useCallback() Hook
    const doLogin = useCallback(() => {
        axios({
            method: 'post',
            url: `${config.API_URL}/login`,
            data: {
                username: username,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setSnackbarOpenFlag(false);
            setErrorFlag(false);
            console.log(response.data);
            localStorage.setItem(`AUTH_TOKEN`, response.data.jwt);
            window.location.reload();         
        })
        .catch(() => {
            setErrorMessage("Login failed (main)")
            setSnackbarOpenFlag(true);
            setErrorFlag(true);
        });
    }, [username, password])


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }

    // support for the enter key without reloading the page
    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            doLogin();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [doLogin]);

    return (
        <div>
            <Container component="main" maxwidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form>
                        <TextField
                            error={errorFlag}
                            className={classes.textInput}
                            id="username"
                            label="Username"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            autoComplete="username"
                            onChange={(l) => { setUsername(l.target.value) }}
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