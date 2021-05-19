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
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/book-vehicle">
        <BookVehiclePage />
      </Route>
      <Route exact path="/my-bookings">
        <MyBookingsPage />
      </Route>
      <Route exact path="/my-vehicles">
        <MyVehiclesPage />
      </Route>
      <Route exact path="/manage-employees">
        <ManageEmployeesPage />
      </Route>
      <Route exact path="/admin-panel">
        <AdminPanelPage />
      </Route>
    </BrowserRouter>
  )
}
