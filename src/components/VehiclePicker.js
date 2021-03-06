//import { List, ListItem, ListItemText } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedVehicleId, setSelectedVehicleId } from '../redux/VehiclePickerSlice';
import config from '../config';
import { CircularProgress, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    loading: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'purpose', headerName: 'Purpose', width: 300 }
]

export default function VehiclePicker(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const [vehicleList, setVehicleList] = useState(null);
    let rows = [];

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
                const sorted = [...response.data].sort((a, b) => { return a.id - b.id })
                setVehicleList(sorted);
            })
        //dispatch(setSelected(0));
    }, [props.url, props.updater]);


    if (!vehicleList) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }
    
    vehicleList.forEach((vehicle) => {
        rows = rows.concat([{
            id: vehicle.id,
            model: [vehicle.brandmodel.brand, vehicle.brandmodel.model].join(" "),
            type: vehicle.type.name,
            purpose: vehicle.purpose.name
        }])
    })

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            disableMultipleSelection={true}
            onRowSelected={
                (row) => {
                    dispatch(setSelectedVehicleId(row.data.id))
                }
            }
            selectionModel={[selectedVehicleId]}
        />
    )
}