import React from 'react';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';

export default function MyBookingsPage() {

    return (
        <div>
            <MenuBar selected="my-bookings" />
            <VehiclePicker url="/get-my-bookings" />
        </div>
    )
}