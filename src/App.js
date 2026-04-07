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
import CustomerDashboard from "./Pages/CustomerDashboard/CustomerDashboard";
import OutstandingDetailsView from "./Pages/Dasboard/OutstandingDetailsView";
import PropertiesDetailsView from "./Pages/Dasboard/PropertiesDetailsView";
import CustomersDetailsView from "./Pages/Dasboard/CustomersDetailsView";
import MetersDetailsView from "./Pages/Dasboard/MetersDetailsView";
import InterimsDetailsView from "./Pages/Dasboard/InterimsDetailsView";
import IndigentDetailsView from "./Pages/Dasboard/IndigentDetailsView";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword";
function App() {
  return (
    <Routes>
      {/* Login without layout */}
      <Route path="/" element={<Login />} />
       <Route path="/register" element={<Registration />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password" element={<ResetPassword />} />

      {/* Pages with layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coplaintsList" element={<CoplaintsList />} />
        <Route path="/users-list" element={<UsersList />} />


         {/* <Route path="/status-list" element={<StatusList />} /> */}
          <Route path="/outstanding-details" element={<OutstandingDetailsView />} />
          <Route path="/properties-details" element={<PropertiesDetailsView />} />
          <Route path="/customers-details" element={<CustomersDetailsView />} />
          <Route path="/meters-details" element={<MetersDetailsView />} />
          <Route path="/interims-details" element={<InterimsDetailsView />} />
          <Route path="/indigent-details" element={<IndigentDetailsView />} />
        <Route path="/details/:wardNo/:type" element={<Details />} />
        <Route path="/Account-list" element={<AccountList />} />
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />

      </Route>
    </Routes>
  );
}

export default App;
