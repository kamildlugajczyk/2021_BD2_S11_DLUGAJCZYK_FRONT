import { List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';


export default function VehiclePicker() {
    //const classes = useStyles();
    const [selectedId, setSelectedId] = useState(0);
    const [vehicleList, setVehicleList] = useState([]);

    useEffect(() => {
        axios.get("/get-all-vehicles")
            .then((response) => {
                setVehicleList(response);
            })
            .catch(() => {
                setVehicleList([
                    {
                        brand: "test",
                        model: "testm"
                    },
                    {
                        brand: "test2",
                        model: "test2m"
                    }
                ]);
            })
    }, []);


    const handleListItemClick = (event, id) => {
        setSelectedId(id);
    }

    return (
        <div>
            <List>
                {vehicleList.map((vehicle) => {
                    <ListItem
                        button
                        selected={selectedId === vehicle.id}
                        onClick={(event) => handleListItemClick(event, vehicle.id)}
                    >
                        <ListItemText primary={vehicle.brand} />
                    </ListItem>
                })}
            </List>
        </div>
    )
}