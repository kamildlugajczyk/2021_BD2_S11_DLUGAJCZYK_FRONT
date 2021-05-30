import { DataGrid } from '@material-ui/data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'phoneNumber', headerName: 'Phone', width: 200 },
  { field: 'function', headerName: 'Function', width: 150},
];

export default function EmployeesList(props) {
    const [employeesArray, setEmployeesArray] = useState([]);
    const dispatch = useDispatch();
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
        dispatch();
    });
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

        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
}