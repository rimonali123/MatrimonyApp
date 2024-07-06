// import ViewFullBiodata from "../../../Components/NormalUserComponent/UserBiodata/ViewFullBiodata";
import ViewFullBiodata from "../../../Components/NormalUserComponent/UserBiodata/ViewFullBiodata";

import useAxiosSecure from "../../../Hoock/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/Provider/AuthProvider";
import { Helmet } from "react-helmet-async";


const ViewBiodata = () => {
    const { user } = useContext(AuthContext);
    const [item, seetItem] = useState([]);
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        axiosSecure.get(`/usersBiodata/${user?.email}`)


            .then(data => {
                seetItem(data.data)
            })
    }, [axiosSecure, user?.email])

    // console.log(item)

    return (
        <div className="px-4">
            <Helmet>
                <title>P.L || View Biodata</title>
            </Helmet>
            <h1 className="text-center py-5 text-3xl font-bold">My Bio Data:</h1>
            <ViewFullBiodata item={item}></ViewFullBiodata>


        </div>
    );
};

export default ViewBiodata;