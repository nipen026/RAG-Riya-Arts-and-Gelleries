import { Navigate, Outlet } from "react-router-dom";

const ProtectedCheckoutRoute = () => {
    const isAuthenticated = localStorage.getItem("access-token-user"); 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    return <Outlet />;
};

export default ProtectedCheckoutRoute;
