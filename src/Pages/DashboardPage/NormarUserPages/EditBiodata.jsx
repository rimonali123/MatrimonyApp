
import EditBiodataForm from "../../../Components/NormalUserComponent/UserBiodata/EditBiodataForm";


import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const EditBiodata = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data:item} = useQuery({
        queryKey: [user?.email, 'usersBiodata'],
        queryFn: async () =>{
            if(user?.email){
                const res = await axiosSecure.get(`/usersBiodata/${user?.email}`)
            return res.data;
            }
        }
        
        
    })
    // console.log(item)


    return (
        <div>
             <Helmet>
                <title>P.L || Edit Biodata</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold mt-3">Edit or Add Your Biodata</h1>
            <EditBiodataForm item={item}></EditBiodataForm>
        </div>
    );
};

export default EditBiodata;