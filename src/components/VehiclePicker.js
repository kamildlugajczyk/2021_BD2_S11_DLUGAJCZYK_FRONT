import { List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected, selectSelectedId } from '../redux/VehiclePickerSlice';

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
    const selectedVehicleId = useSelector(selectSelectedId);
    const dispatch = useDispatch();
    const [vehicleList, setVehicleList] = useState([]);

    useEffect(() => {
        axios.get(props.url)
            .then((response) => {
                setVehicleList(response);
            })
            .catch(() => {
                setVehicleList([
                    {
                        id: 1,
                        brand: "test",
                        model: "testm"
                    },
                    {
                        id: 2,
                        brand: "test2",
                        model: "test2m"
                    }
                ]);
            });
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
                            secondary="secondary" 
                        />
                    </ListItem>
                    )
                })}
            </List>
        </div>
    )
}