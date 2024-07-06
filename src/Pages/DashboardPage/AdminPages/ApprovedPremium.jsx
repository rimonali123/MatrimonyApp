
import { Helmet } from "react-helmet-async";
import ApprovePremiumTable from "../../../Components/AdminComponents/ApprovePremiumTable";
import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments } = useQuery({
        queryKey: ['userPaymentInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get('/userPaymentInfo');
            return res.data
        }

    })
    console.log(payments)
    return (
        <div>
             <Helmet>
                <title>P.L || Approve Premium Request</title>
            </Helmet>

            <h1 className="text-center py-5 text-3xl font-bold">Approve The User as a Premium user</h1>
            {payments ?
                <ApprovePremiumTable></ApprovePremiumTable>
                : <span className="text-2xl font-bold text-red-400 ml-10 mt-5">There is no approve request found</span>
            }
        </div>
    );
};

export default ApprovedPremium;