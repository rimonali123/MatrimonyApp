import ContactRequestTable from "../../../Components/NormalUserComponent/ContactRequestTable";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/Provider/AuthProvider";
import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import { Helmet } from "react-helmet-async";



const MyContactRequest = () => {

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments } = useQuery({
        queryKey: ['paymentInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentInfo/${user?.email}`);
            return res.data
        }

    })
    console.log(payments)


    const { data: users } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data
        }

    })
    console.log(users)

    
    const premium = users?.roles
    console.log(premium)
    
    return (
        <div>
             <Helmet>
                <title>P.L || My Contact Request</title>
            </Helmet>
            <h1 className="text-center py-5 text-3xl font-bold">My Contact Request</h1>
            {payments  ? <ContactRequestTable></ContactRequestTable> : <span className="text-2xl font-bold text-red-400 ml-10 mt-5">There is no contact request found</span>}
        </div>
    );
};

export default MyContactRequest;