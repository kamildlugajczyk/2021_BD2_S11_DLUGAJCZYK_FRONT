import { List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '400px',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginLeft: '200px'
    },
  }));

export default function VehiclePicker() {
    const classes = useStyles();
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
            })
    }, []);

    const handleListItemClick = (event, id) => {
        setSelectedId(id);
    }

    return (
        <div className={classes.root}>
            <List component="nav">
                {vehicleList.map((vehicle) => {
                    return (
                    <ListItem
                        button
                        selected={selectedId === vehicle.id}
                        onClick={(event) => handleListItemClick(event, vehicle.id)}
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