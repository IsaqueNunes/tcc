import React from "react";
import { Navigate, Outlet, Route} from "react-router-dom";

type ProtectedRouteProps = {
  Component: React.ReactNode,
  path: string
}

export default function ProtectedRoute ({component, ...rest}: any) {
  const data = !!localStorage.getItem('authData');
  return data ? <Outlet /> : <Navigate to="/" />;
}


const PrivateRoute = ({component, isAuthenticated, ...rest}: any) => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Navigate replace to="/login" />
    );
    return <Route {...rest} render={routeComponent}/>;
};
