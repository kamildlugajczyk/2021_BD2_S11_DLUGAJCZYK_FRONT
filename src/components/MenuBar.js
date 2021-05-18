import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

export default function MenuBar() {
    const isAdmin = localStorage.getItem("admin-flag");
    const history = useHistory();

    function logout() {
        localStorage.removeItem("AUTH_TOKEN");
        axios.defaults.headers.common["Authorization"] = null;
        if (window.location.pathname === "/") {
            window.location.reload();
        } else {
            history.push("/");
        }
    }

    return (
        <Button 
            onClick={logout}
            variant="outlined"
            >
            Logout
        </Button>
    )
}