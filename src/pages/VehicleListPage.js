import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import VehicleCalendar from '../components/VehicleCalendar';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import { makeStyles } from '@material-ui/core';
import config from '../config';
import VehicleDetails from '../components/VehicleDetails';


export default function VehicleListGate() {

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

    if (isTokenValid === null) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {isTokenValid === true ? <VehicleListPage /> : <LoginPage />}
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    picker: {
        height: window.innerHeight - 100
    },
    addButtonDiv: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10
    },
    pickerAddBlock: {
        width: (window.innerWidth - 200) * 0.4
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
    }
}));


function VehicleListPage() {
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const classes = useStyles();

    return (
        <div>
            <MenuBar selected="all-vehicles" />
            <div className={classes.page}>
                <div className={classes.pickerAddBlock}>
                    <div className={classes.picker}>
                        <VehiclePicker url="/vehicle" />
                    </div>
                    <div className={classes.addButtonDiv}>
                        <p>add button goes here</p>
                    </div>
                </div>
                {selectedVehicleId !== 0 &&
                    <div className={classes.calendarDetailsBlock}>
                        <div className={classes.calendar}>
                            <VehicleCalendar />
                        </div>
                        <div className={classes.details}>
                            <VehicleDetails />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}