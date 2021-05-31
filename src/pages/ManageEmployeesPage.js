import React from 'react';
import EmployeesList from '../components/EmployeesList';
import MenuBar from '../components/MenuBar';

export default function ManageEmployeesPage() {

    return (
        <div>
            <MenuBar selected="manage-employees" />
            <EmployeesList url="http://localhost:5000/manage-employees" />
        </div>
    )
}