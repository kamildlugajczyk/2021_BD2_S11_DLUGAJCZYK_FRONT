import React from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';

export default function BookVehiclePage() {

    return (
        <div>
            <MenuBar selected="book-vehicle" />
            <VehiclePicker url="http://localhost:5000/all-vehicles" />
        </div>
    )
}