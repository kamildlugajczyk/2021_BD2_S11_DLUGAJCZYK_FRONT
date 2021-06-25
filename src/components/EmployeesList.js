import { DataGrid } from '@material-ui/data-grid';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedEmployeeId } from '../redux/EmployeesListSlice';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { getAllEmployees } from '../services/Employee';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'function', headerName: 'Function', width: 150 },
];

const useStyles = makeStyles((theme) => ({
    loading: {
        height: window.innerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

export default function EmployeesList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [employeesArray, setEmployeesArray] = useState(null);

    useEffect(() => {
        getAllEmployees()
            .then((response) => {
                const sorted = [...response.data].sort((a, b) => { return a.id - b.id });
                setEmployeesArray(sorted);
            })
        dispatch(setSelectedEmployeeId(0));
    }, [dispatch, props.updater]);

    if (!employeesArray) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    let rows = [];
    employeesArray.forEach((employee) => {
        rows = rows.concat([{
            id: employee.id,
            firstName: employee.firstname,
            lastName: employee.lastname,
            phoneNumber: employee.phoneNumber,
            username: employee.username,
            function: employee.function.name,
        }]);
    });

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            disableMultipleSelection={true}
            onRowSelected={(row) => { dispatch(setSelectedEmployeeId(row.data.id)) }}
        />
    );
}