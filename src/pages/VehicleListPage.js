import React from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';

export default function VehicleListPage() {

    return (
        <div>
            <MenuBar selected="all-vehicles" />
            <VehiclePicker url="http://localhost:5000/all-vehicles" />
        </div>
    )
}