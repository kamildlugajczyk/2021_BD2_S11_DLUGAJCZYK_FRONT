import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import { makeStyles } from '@material-ui/core';
import config from '../config';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import VehicleCalendar from '../components/VahicleCalendar';


export default function BookVehicleGate() {

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
            {isTokenValid === true ? <BookVehiclePage/> : <LoginPage/>}
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    picker: {
        width: (window.innerWidth - 200) * 0.4, //% values dont work for datagrid for some reason
        height: window.innerHeight - 100
    },
    calendar: {
        height: window.innerHeight * 0.5
    },
    details: {
        height: window.innerHeight * 0.5
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