import React from "react";
import Dashboard from "../pages/Dashboard";
import {
  DashboardRounded,
} from "@mui/icons-material";

const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
    icon: <DashboardRounded />, 
  },
 
];

export default routes;
