// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dasboard/Dashboard";
import MainLayout from "./Layout/MainLayout";
import CoplaintsList from "./Pages/Complaints/ComplaintsList";

function App() {
  return (
    <Routes>
      {/* Login without layout */}
      <Route path="/" element={<Login />} />

      {/* Pages with layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/coplaintsList" element={<CoplaintsList />} />
      </Route>
    </Routes>
  );
}

export default App;
