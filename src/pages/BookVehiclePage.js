import React, { useState, useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import { CircularProgress, makeStyles, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import VehicleCalendar from '../components/VehicleCalendar';
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
    pickerBlock: {
        width: "50%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        flex: "1"
    },
    picker: {
        paddingRight: "0.5%",
        paddingBottom: "15px",
        width: "100%",
        height: "100%",
        flex: "1"
    },
    calendarDetailsBlock: {
        paddingLeft: "1%",
        paddingRight: "1.5%",
        height: "100%",
        width: "100%",
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    calendar: {
        height: "50%",
        width: "100%"
    },
    bookingDialog: {
        height: "50%",
        width: "30%",
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        <div className={classes.root}>
            <MenuBar selected="book-vehicle" />
            <div className={classes.content}>
                <div className={classes.pickerBlock}>
                    <div className={classes.picker}>
                        <VehiclePicker url="/vehicle" />
                    </div>
                </div>
                {selectedVehicleId !== 0 &&
                    <div className={classes.calendarDetailsBlock}>
                        <div className={classes.calendar}>
                            <VehicleCalendar />
                        </div>
                        <div className={classes.bookingDialog}>
                            vehicle dialog goes here
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}