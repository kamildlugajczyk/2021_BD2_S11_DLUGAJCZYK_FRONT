import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import VehicleList from './VehicleListPage';
import config from '../config';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    loading: {
        height: window.innerHeight,
        width: window.innerWidth,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

export default function MainPage() {

    const classes = useStyles();
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
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            {isTokenValid === true ? <VehicleList/> : <LoginPage/>}
        </div>
    )
}