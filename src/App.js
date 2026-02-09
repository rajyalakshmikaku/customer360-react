// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dasboard/Dashboard";
import MainLayout from "./Layout/MainLayout";
import CoplaintsList from "./Pages/Complaints/ComplaintsList";
import StatusList from "./Pages/Status/Status-list";

function App() {
  return (
    <Routes>
      {/* Login without layout */}
      <Route path="/" element={<Login />} />

      {/* Pages with layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/coplaintsList" element={<CoplaintsList />} />
         <Route path="/status-list" element={<StatusList />} />
      </Route>
    </Routes>
  );
}

export default App;
