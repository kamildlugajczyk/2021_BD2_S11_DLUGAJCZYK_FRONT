import React from 'react';
import LoginPage from './LoginPage';
import VehicleList from './VehicleList';

export default function MainPage() {
    const token = localStorage.getItem("AUTH_TOKEN");
    return token ? <VehicleList/> : <LoginPage/>
}