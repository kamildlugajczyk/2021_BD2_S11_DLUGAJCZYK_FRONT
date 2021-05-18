import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import MainPage from "../pages/MainPage";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <MainPage />
      </Route>
    </BrowserRouter>
  )
}
