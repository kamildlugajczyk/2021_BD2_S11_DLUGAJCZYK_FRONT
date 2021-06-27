import React, { useState, useEffect, useCallback } from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import { CircularProgress, makeStyles, Snackbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import VehicleCalendar from '../components/VehicleCalendar';
import { getMyPermissions } from '../services/UserAccount';
import DatePicker from 'react-datepicker';
import Button from '@material-ui/core/Button';
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from '@material-ui/lab';

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
        width: "50%",
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
    },
    datePicker: {
        width: "100%",
        fontFamily: "Arial"
    },
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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error");

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }
    
    const confirmBooking = useCallback(() => {
        console.log(`${selectedVehicleId} ${startDate} ${endDate}`);
        if(startDate > endDate){
            setErrorMessage("Wrong date; start after finish");
            setSnackbarOpenFlag(true);
            return;
        }
    }, [selectedVehicleId, startDate, endDate])

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
                        <DatePicker
                            required
                            dateFormat="dd/MM/yyyy"
                            onChange={setStartDate}
                            selected={startDate}
                        />
                        <DatePicker
                            required
                            dateFormat="dd/MM/yyyy"
                            onChange={setEndDate}
                            selected={endDate}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={()=>confirmBooking(selectedVehicleId, startDate, endDate)}
                        >
                            Book vehicle
                        </Button>
                        <Snackbar
                            open={snackbarOpenFlag}
                            autoHideDuration={2000}
                            onClose={handleSnackbarClose}
                        >
                            <Alert onClose={handleSnackbarClose} severity="error">
                                {errorMessage}
                            </Alert>
                        </Snackbar>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}