//import { List, ListItem, ListItemText } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelected } from '../redux/VehiclePickerSlice';
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
            const sorted = [...response.data].sort((a, b) => {return a.id - b.id})
            setVehicleList(sorted);
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
}