import React from 'react';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default function LoginPrompt() {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    function doLogin() {
        axios({
            method: 'post',
            url: 'no nie wiem',
            data: {
                login: login,
                password: password
            }
        })
        .then((response) => {
            localStorage.setItem(`AUTH_TOKEN`, response.data);
            axios.defaults.headers.common["Authorization"] = response.data;
        })
        .catch(() => {
            localStorage.setItem('AUTH_TOKEN', "Bearer nosiema");
            
        });
        window.location.reload();
    }

    return(
        <div>
            <TextField
                id="login"
                label="Login"
                name="login"
                onChange={(l) => { setLogin(l.target.value) }}
            />
            <TextField
                id="password"
                label="Password"
                name="password"
                onChange={(l) => { setPassword(l.target.value) }}
            />
            <Button onClick={doLogin}>
                Login
            </Button>
        </div>
    );
}