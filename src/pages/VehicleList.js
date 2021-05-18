import React from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function VehicleList() {
    const history = useHistory();
    function lol(){
        localStorage.removeItem("AUTH_TOKEN");
        window.location.reload();
    }

    return (
        <Button onClick={lol}>Logout</Button>
    )
}