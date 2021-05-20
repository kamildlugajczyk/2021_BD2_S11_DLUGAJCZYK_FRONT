import React from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';

export default function MyVehiclesPage() {

    return (
        <div>
            <MenuBar selected="my-vehicles" />
            <VehiclePicker url="/get-my-vehicles" />
        </div>
    )
}