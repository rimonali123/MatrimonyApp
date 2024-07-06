import { useQuery } from "@tanstack/react-query";
import ApproveContactRequestTable from "../../../Components/AdminComponents/ApproveContactRequestTable";
import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const ApprovedContactRequest = () => {
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
                <title>P.L || Approve Contact Request</title>
            </Helmet>
            
            <h1 className="text-center py-5 text-3xl font-bold">Approve the user contact request</h1>
            
            {payments ?
                <ApproveContactRequestTable></ApproveContactRequestTable>
                : <span className="text-2xl font-bold text-red-400 ml-10 mt-5">There is no approve request found</span>
            }
        </div>
    );
};

export default ApprovedContactRequest;