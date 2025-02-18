import {Navigate, useLocation} from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({children}) => {
    const token = Cookies.get("colorStormToken");
    const role = Cookies.get("colorStormRole");
    const location = useLocation();


    if (location.pathname.startsWith("/cp") && (role !== "Admin" || !token)) {
        return <Navigate to="/" replace state={{from: location}}/>;
    }

    return children;
};

export {ProtectedRoute};