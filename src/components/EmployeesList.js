import { DataGrid } from '@material-ui/data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected, selectSelectedEmployeeId } from '../redux/EmployeesListSlice';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'phoneNumber', headerName: 'Phone', width: 200 },
  { field: 'function', headerName: 'Function', width: 150},
];

export default function EmployeesList(props) {
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
            url: props.url,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("AUTH_TOKEN")
            }
        })
        .then((response) => {
            setEmployeesArray(response.data);
        })
        dispatch(setSelected(0));
    }, [props.url, dispatch]);

    let rows = [];
    employeesArray.map((employee) => {
        rows = rows.concat([{
            id: employee.id,
            firstName: employee.firstname,
            lastName: employee.lastname,
            phoneNumber: employee.phonenumber,
            function: employee.function,
        }]);
    });
    return (
        <div style={{height: '700px', marginLeft: '200px' }}>
            <DataGrid rows={rows} columns={columns} disableMultipleSelection={true} onRowSelected={(row) => {dispatch(setSelected(row.data.id))}} />
        </div>
    );
}