import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import { CircularProgress, makeStyles } from '@material-ui/core';
import moment from 'moment';
import config from '../config';

const useStyles = makeStyles((theme) => ({
    'rbc-calendar': {
        fontFamily: 'Roboto, Helvetica, sans-serif'
    },
    loading: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

export default function VehicleCalendar(props) {
    const localizer = momentLocalizer(moment);
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const [unavailabilityList, setUnavailabilityList] = useState(null);
    const classes = useStyles();
    let events = [];

    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.API_URL}/unavailability/${selectedVehicleId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
        .then((response) => {
            setUnavailabilityList(response.data);
        })
    }, [selectedVehicleId])


    if (!unavailabilityList) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    unavailabilityList.forEach((entry) => {
        events = events.concat([{
            title: entry.servicingId ? "Service" : (entry.rentingId ? "Booking" : "Unavailable"),
            start: entry.startDate,
            end: entry.endDate ? entry.endDate : entry.endPredictDate,
        }])
    })

    return (
        <Calendar
            className={classes['rbc-calendar']}
            localizer={localizer}
            events={events}
            views={['month']}
        />
    )
}