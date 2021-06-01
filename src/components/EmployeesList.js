import { DataGrid } from '@material-ui/data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelected } from '../redux/EmployeesListSlice';
import config from '../config';
import { makeStyles } from '@material-ui/core';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'phoneNumber', headerName: 'Phone', width: 200 },
  { field: 'function', headerName: 'Function', width: 150},
];

const useStyles = makeStyles((theme) => ({
    root: {
        height: window.innerHeight*0.8, //80% doesnt work
        marginLeft: '200px'
    },
}))

export default function EmployeesList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [employeesArray, setEmployeesArray] = useState([
        {
            id: 1,
            firstName: "test",
            lastName: "test",
            phoneNumber: 0,
            function: "test"
        }
    ]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.API_URL}/person`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
        .then((response) => {
            setEmployeesArray(response.data);
        })
        dispatch(setSelected(0));
    }, [dispatch]);

    let rows = [];
    employeesArray.forEach((employee) => {
        rows = rows.concat([{
            id: employee.id,
            firstName: employee.firstname,
            lastName: employee.lastname,
            phoneNumber: employee.phoneNumber,
            function: employee.function.name,
        }]);
    });
    return (
        <div className={classes.root}>
            <DataGrid rows={rows} columns={columns} disableMultipleSelection={true} onRowSelected={(row) => {dispatch(setSelected(row.data.id))}} />
        </div>
    );
}