import { useContext } from "react";
import useAdmin from "../Hoock/useAdmin";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="w-24 mx-auto h-24 mt-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;