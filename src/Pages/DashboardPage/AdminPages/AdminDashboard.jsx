import { useQuery } from "@tanstack/react-query";
import DashboardCard from "../../../Components/AdminComponents/DashboardCard";
import useAxiosPublic from "../../../Hoock/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const AdminDashboard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: items } = useQuery({
        queryKey: ['usersBiodata'],
        queryFn: async () => {
            const res = await axiosPublic.get('/usersBiodata', {
            });
            return res.data;
        }
    });

    // console.log(items)
    return (
        <div>
             <Helmet>
                <title>P.L || Admin Dashboard</title>
            </Helmet>
            <h1 className="text-center py-5 text-3xl font-bold">Biodata Counter {items?.length}</h1>
            <DashboardCard items={items}></DashboardCard>
        </div>
    );
};

export default AdminDashboard;