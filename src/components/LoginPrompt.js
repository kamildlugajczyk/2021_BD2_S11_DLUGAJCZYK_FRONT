import React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';

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

    function doLogin() {
        axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            data: {
                login: login,
                password: password
            }
        })
            .then((response) => {
                localStorage.setItem(`AUTH_TOKEN`, response.data);
                axios.defaults.headers.common["Authorization"] = response.data;
                window.location.reload();
            })
            .catch(() => {
                console.log("login error");
            });
    }

    return (
        <Container component="main" maxwidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form>
                    <TextField
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
    );
}