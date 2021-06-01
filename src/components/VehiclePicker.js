import { List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected, selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import config from '../config';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '400px',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginLeft: '200px'
    },
  }));

export default function VehiclePicker(props) {
    const classes = useStyles();
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const dispatch = useDispatch();
    const [vehicleList, setVehicleList] = useState([]);


    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.API_URL}${props.url}`,
            //url: `https://fleet-management-develop.herokuapp.com${props.url}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
        .then((response) => {
            setVehicleList(response.data);
        })
        dispatch(setSelected(0));
    }, [props.url, dispatch]);

    return (
        <div className={classes.root}>
            <List component="nav">
                {vehicleList.map((vehicle) => {
                    return (
                    <ListItem
                        button
                        key={vehicle.id}
                        selected={selectedVehicleId === vehicle.id}
                        onClick={() => dispatch(setSelected(vehicle.id))}
                    >
                        <ListItemText 
                            primary={[vehicle.brand, vehicle.model].join(" ")}
                            secondary={[vehicle.type, vehicle.equipmentlevel, vehicle.purpose].join(" | ")} 
                        />
                    </ListItem>
                    )
                })}
            </List>
        </div>
    )
}