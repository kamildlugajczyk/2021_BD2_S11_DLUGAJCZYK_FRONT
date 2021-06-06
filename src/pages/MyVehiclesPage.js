import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import config from '../config';



export default function MyVehiclesGate() {

    const [isTokenValid, setIsTokenValid] = useState(null);

    //fetching user permissions to check if the locally stored token is still valid
    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.API_URL}/authorities`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
        .then((response) => {
            localStorage.setItem("user-permissions", response.data[0].authority);
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
            {isTokenValid === true ? <MyVehiclesPage/> : <LoginPage/>}
        </div>
    )
}

function MyVehiclesPage() {

    return (
        <div>
            <MenuBar selected="my-vehicles" />
            <VehiclePicker url="/get-my-vehicles" />
        </div>
    )
}