import React from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';

export default function VehicleListPage() {

    return (
        <div>
            <MenuBar />
            <VehiclePicker url="/get-all-vehicles" />
        </div>
    )
}