import React, { useState, useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { getMyPermissions } from '../services/UserAccount';



const useStyles = makeStyles((theme) => ({
    loading: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

export default function MyVehiclesGate() {

    const classes = useStyles();
    const [isTokenValid, setIsTokenValid] = useState(null);

    //fetching user permissions to check if the locally stored token is still valid
    useEffect(() => {
        getMyPermissions()
            .then((response) => {
                localStorage.setItem("user-permissions", response.data[0].authority);
                setIsTokenValid(true);
            })
            .catch(() => {
                setIsTokenValid(false);
            })
    }, [])

    if (isTokenValid === null) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            {isTokenValid === true ? <MyVehiclesPage /> : <LoginPage />}
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