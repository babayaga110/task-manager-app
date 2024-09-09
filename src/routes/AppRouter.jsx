import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/Not_Found";
import ProtectedRoute from "./ProtectedRoute";
import routes from "./routes";
import SignupPage from "../pages/Signup";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";

const AppRouter = () => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthState({
        user: user,
        loading: false,
      });
    });

    return () => unsubscribe(); 
  }, []);

  if (authState.loading) {
    return <Loading/>; 
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: authState.user ? <Navigate to="/dashboard" /> : <Login />,
      index: true,
    },
    {
      path: "/signup",
      element: authState.user ? <Navigate to="/dashboard" /> : <SignupPage />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute user={authState.user} />,
      children: routes,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
