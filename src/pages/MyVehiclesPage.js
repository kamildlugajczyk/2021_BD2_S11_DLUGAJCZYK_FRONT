import React, { useState, useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { getMyPermissions } from '../services/UserAccount';



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "fixed",
        height: "100%",
        width: "100%"
    },
    content: {
        display: 'flex',
        flex: "1"
    },
    vehiclePicker: {
        height: "100%",
        flex: "1"
    },
    serviceBlock: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "1"
    },
    servicePicker:{
        height: "100%",
        flex: "1",
    },
    buttons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 20,
        paddingBottom: 30
    },
    loading: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        position: 'fixed',
        width: "25%",
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
}));

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
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MenuBar selected="my-vehicles" />
            <div className={classes.content}>
                <div className={classes.vehiclePicker}>
                    <VehiclePicker url="sdadd"/>
                </div>
            </div>
        </div>
    )
}