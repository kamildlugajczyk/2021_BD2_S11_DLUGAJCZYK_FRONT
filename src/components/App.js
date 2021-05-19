import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import MainPage from "../pages/MainPage";
import BookVehiclePage from "../pages/BookVehiclePage";
import MyBookingsPage from "../pages/MyBookingsPage";
import MyVehiclesPage from "../pages/MyVehiclesPage";
import ManageEmployeesPage from "../pages/ManageEmployeesPage";
import AdminPanelPage from "../pages/AdminPanelPage";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <MainPage />
      </Route>
      <Route path="/book-vehicle">
        <BookVehiclePage />
      </Route>
      <Route path="/my-bookings">
        <MyBookingsPage />
      </Route>
      <Route path="/my-vehicles">
        <MyVehiclesPage />
      </Route>
      <Route path="/manage-employees">
        <ManageEmployeesPage />
      </Route>
      <Route path="/admin-panel">
        <AdminPanelPage />
      </Route>
    </BrowserRouter>
  )
}
