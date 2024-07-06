import { useQuery } from "@tanstack/react-query";
import FavoriteBiodataTable from "../../../Components/NormalUserComponent/FavoriteBiodataTable";
import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/Provider/AuthProvider";


const FavoriteBiodata = () => {
const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: item,  } = useQuery({
        queryKey: ['favoriteBiodata'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favoriteBiodata/${user?.email}`)
            return res.data
        }
    })
    // console.log(item)
    return (
        <div>
             <Helmet>
                <title>P.L || Favorite Biodata</title>
            </Helmet>
            <h1 className="text-center py-5 text-3xl font-bold">My Favorite Bio Data ({item?.length})</h1>
            
            {item?.length > 0 ? <FavoriteBiodataTable></FavoriteBiodataTable> : <span className="text-2xl font-bold text-red-400 ml-10 mt-5">There is no Favorite biodata found</span>}
        </div>
    );
};

export default FavoriteBiodata;