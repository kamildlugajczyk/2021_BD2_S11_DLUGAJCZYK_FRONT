import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { CircularProgress, Container, CssBaseline, makeStyles, Snackbar } from '@material-ui/core';
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
    },
    loading: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

export default function LoginPrompt() {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorFlagUsername, setErrorFlagUsername] = useState(false);
    const [errorFlagPassword, setErrorFlagPassword] = useState(false);
    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // The 'doLogin' function makes the dependencies of useEffect Hook (at line 73) change on every render. To fix this, wrap the definition of 'doLogin' in its own useCallback() Hook
    const doLogin = useCallback(() => {
        setIsButtonDisabled(true);
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
                setErrorFlagUsername(false);
                setErrorFlagPassword(false);
                console.log(response.data);
                localStorage.setItem(`AUTH_TOKEN`, response.data.jwt);
                window.location.reload();
            })
            .catch(() => {
                setErrorMessage("Login failed (main)")
                setSnackbarOpenFlag(true);
                setErrorFlagUsername(true);
                setErrorFlagPassword(true);
                setIsButtonDisabled(false);
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
                            error={errorFlagUsername}
                            className={classes.textInput}
                            id="username"
                            label="Username"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            autoComplete="username"
                            onChange={(l) => {
                                setUsername(l.target.value)
                                setErrorFlagUsername(false);
                            }}
                        />
                        <TextField
                            error={errorFlagPassword}
                            className={classes.textInput}
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            autoComplete="current-password"
                            onChange={(l) => {
                                setPassword(l.target.value);
                                setErrorFlagPassword(false)
                            }}
                        />
                        <Button
                            onClick={doLogin}
                            variant="contained"
                            fullWidth
                            disabled={isButtonDisabled}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </Container>
            {isButtonDisabled &&
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            }
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