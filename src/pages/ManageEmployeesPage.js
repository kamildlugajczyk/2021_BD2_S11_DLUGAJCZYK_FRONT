import React from 'react';
import EmployeesList from '../components/EmployeesList';
import MenuBar from '../components/MenuBar';

export default function ManageEmployeesPage() {

    return (
        <div>
            <MenuBar selected="manage-employees" />
            <EmployeesList />
        </div>
    )
}