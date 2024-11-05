//import cookie
import Cookies from "js-cookie";

//import react router dom
import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
    //token from cookie
    const token = Cookies.get("token");

    //if token not set
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoutes;