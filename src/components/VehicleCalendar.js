import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import config from '../config';

const useStyles = makeStyles((theme) => ({
    'rbc-calendar': {
        fontFamily: 'Roboto, Helvetica, sans-serif'
    }
}))

export default function VehicleCalendar(props) {
    const localizer = momentLocalizer(moment);
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const [serviceList, setServiceList] = useState([]);
    const classes = useStyles();
    let events = [];

    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.API_URL}/service/vehicle/${selectedVehicleId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
        .then((response) => {
            setServiceList(response.data);
        })
    }, [selectedVehicleId])

    serviceList.forEach((service) => {
        events = events.concat([{
            title: "Service",
            start: service.vehicleUnavailability.startDate,
            end: service.vehicleUnavailability.endDate,
            allDay: true
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