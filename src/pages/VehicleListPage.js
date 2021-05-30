import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import config from '../config';

export default function VehicleListGate() {

    const [isTokenValid, setIsTokenValid] = useState(null);


    //fetching user permissions to check if the locally stored token is still valid
    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.API_URL}/my-permissions`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("AUTH_TOKEN")
            }
        })
        .then((response) => {
            localStorage.setItem("user-permissions", response.data.permissions);
            setIsTokenValid(true);
        })
        .catch(() => {
            setIsTokenValid(false);
        })
    }, [])

    if(isTokenValid === null) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {isTokenValid === true ? <VehicleListPage/> : <LoginPage/>}
        </div>
    )
}

function VehicleListPage() {

    return (
        <div>
            <MenuBar selected="all-vehicles" />
            <VehiclePicker url="/vehicles" />
        </div>
    )
}