//import { List, ListItem, ListItemText } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected, selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import config from '../config';

const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'type', headerName: 'Type', width: 120},
    {field: 'purpose', headerName: 'Purpose', width: 300}
]

export default function VehiclePicker(props) {
    const dispatch = useDispatch();
    const [vehicleList, setVehicleList] = useState([]);


    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.API_URL}${props.url}`,
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

    let rows = [];
    vehicleList.forEach((vehicle) => {
        rows = rows.concat([{
            id: vehicle.id,
            model: [vehicle.brandmodel.brand, vehicle.brandmodel.model].join(" "),
            type: vehicle.type.name,
            purpose: vehicle.purpose.name
        }])
    })

    return (
        <DataGrid rows={rows} columns={columns} disableMultipleSelection={true} onRowSelected={(row) => {dispatch(setSelected(row.data.id))}}/>
    )

    // return (
    //     <div className={classes.root}>
    //         <List component="nav">
    //             {vehicleList.map((vehicle) => {
    //                 return (
    //                 <ListItem
    //                     button
    //                     key={vehicle.id}
    //                     selected={selectedVehicleId === vehicle.id}
    //                     onClick={() => dispatch(setSelected(vehicle.id))}
    //                 >
    //                     <ListItemText 
    //                         primary={[vehicle.brandmodel.brand, vehicle.brandmodel.model].join(" ")}
    //                         secondary={[vehicle.type.name, vehicle.equipmentLevel, vehicle.purpose.name].join(" | ")} 
    //                     />
    //                 </ListItem>
    //                 )
    //             })}
    //         </List>
    //     </div>
    // )
}