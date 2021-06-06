import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import config from '../config';


export default function MyBookingsGate() {

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
            {isTokenValid === true ? <MyBookingsPage/> : <LoginPage/>}
        </div>
    )
}

function MyBookingsPage() {

    return (
        <div>
            <MenuBar selected="my-bookings" />
            <VehiclePicker url="/get-my-bookings" />
        </div>
    )
}