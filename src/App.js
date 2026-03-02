// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dasboard/Dashboard";
import MainLayout from "./Layout/MainLayout";
import CoplaintsList from "./Pages/Complaints/ComplaintsList";
import UsersList from "./Pages/Users/UsersList";
import AccountList from "./Pages/Account/Account-list";

import Details from "./Pages/Dasboard/Details";
import Registration from "./Pages/Registration/Registration";
function App() {
  return (
    <Routes>
      {/* Login without layout */}
      <Route path="/" element={<Login />} />
       <Route path="/register" element={<Registration />} />

      {/* Pages with layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coplaintsList" element={<CoplaintsList />} />
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/details/:wardNo/:type" element={<Details />} />
        <Route path="/Account-list" element={<AccountList />} />
      </Route>
    </Routes>
  );
}

export default App;
