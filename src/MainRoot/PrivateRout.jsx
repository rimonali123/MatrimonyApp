import { useContext } from "react";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRout = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log({user, location})

    if (loading) {
        return <div className="w-24 mx-auto h-24 mt-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
    }

    if (user?.email) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRout;