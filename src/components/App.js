import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import VehicleListGate from "../pages/VehicleListPage";
import BookVehicleGate from "../pages/BookVehiclePage";
import MyBookingsGate from "../pages/MyBookingsPage";
import MyVehiclesGate from "../pages/MyVehiclesPage";
import ManageEmployeesGate from "../pages/ManageEmployeesPage";
import AdminPanelPage from "../pages/AdminPanelPage";

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <VehicleListGate />
      </Route>
      <Route exact path="/book-vehicle">
        <BookVehicleGate />
      </Route>
      <Route exact path="/my-bookings">
        <MyBookingsGate />
      </Route>
      <Route exact path="/my-vehicles">
        <MyVehiclesGate />
      </Route>
      <Route exact path="/manage-employees">
        <ManageEmployeesGate />
      </Route>
      <Route exact path="/admin-panel">
        <AdminPanelPage />
      </Route>
    </BrowserRouter>
  )
}
