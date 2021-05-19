import React, { Suspense } from 'react';

const LoginPage = React.lazy(() => import('./LoginPage'));
const VehicleList = React.lazy(() => import('./VehicleListPage'));

export default function MainPage() {
    const token = localStorage.getItem("AUTH_TOKEN");
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {token ? <VehicleList/> : <LoginPage/>}
        </Suspense>
    )
}