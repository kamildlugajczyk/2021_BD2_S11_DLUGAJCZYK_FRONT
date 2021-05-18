import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

export default function VehicleListPage() {
    function lol(){
        localStorage.removeItem("AUTH_TOKEN");
        axios.defaults.headers.common["Authorization"] = null;
        window.location.reload();
    }

    return (
        <Button onClick={lol}>Logout</Button>
    )
}