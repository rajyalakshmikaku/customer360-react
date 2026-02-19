// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dasboard/Dashboard";
import MainLayout from "./Layout/MainLayout";
import CoplaintsList from "./Pages/Complaints/ComplaintsList";
import UsersList from "./Pages/Users/UsersList";
import StatusList from "./Pages/Status/Status-list";

import Details from "./Pages/Dasboard/Details";
function App() {
  return (
    <Routes>
      {/* Login without layout */}
      <Route path="/" element={<Login />} />

      {/* Pages with layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/coplaintsList" element={<CoplaintsList />} />
        <Route path="/users-list" element={<UsersList />} />
         <Route path="/status-list" element={<StatusList />} />
<Route path="/details/:wardNo/:type" element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;
