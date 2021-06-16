import React, { useState, useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import VehicleCalendar from '../components/VehicleCalendar';
import { getMyPermissions } from '../services/UserAccount';


const useStyles = makeStyles((theme) => ({
    picker: {
        width: (window.innerWidth - 200) * 0.4, //% values dont work for datagrid for some reason
        height: window.innerHeight - 20
    },
    calendar: {
        height: window.innerHeight * 0.5
    },
    details: {
        marginTop: 30
    },
    calendarDetailsBlock: {
        width: (window.innerWidth - 200) * 0.4,
        margin: '0px 100px 0px 100px'
    },
    page: {
        display: 'flex',
        marginLeft: 200
    },
    loading: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));


export default function BookVehicleGate() {

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
            {isTokenValid === true ? <BookVehiclePage /> : <LoginPage />}
        </div>
    )
}



function BookVehiclePage() {
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const classes = useStyles();

    return (
        <div>
            <MenuBar selected="book-vehicle" />
            <div className={classes.page}>
                <div className={classes.picker}>
                    <VehiclePicker url="/vehicle" />
                </div>
                {selectedVehicleId !== 0 &&
                    <div className={classes.calendarDetailsBlock}>
                        <div className={classes.calendar}>
                            <VehicleCalendar />
                        </div>
                        <div className={classes.details}>
                            booking dialog here
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}