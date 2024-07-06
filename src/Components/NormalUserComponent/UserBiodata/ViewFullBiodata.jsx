

import { MdWorkspacePremium } from "react-icons/md";

import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hoock/useAxiosPublic";
import { Link } from "react-router-dom";

const ViewFullBiodata = ({ item }) => {
    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);

    const { data: payments } = useQuery({
        queryKey: ['paymentInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentInfo/${user?.email}`);
            return res.data
        }

    })
    console.log(payments)

    const userStatus = payments?.status
    console.log(userStatus)

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

    // const handleRequest = async () => {
    //     Swal.fire({
    //         title: "Are you sure to make your biodata premium ?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, Make it!"
    //     }).then(async (result) => {
    //         console.log(result)
    //         if (result.isConfirmed) {
    //             const reqData = {
    //                 name: item?.name,
    //                 email: item?.email,
    //                 userId: item?.userId
    //             }
    //             const userReq = await axiosSecure.post('/userReq', reqData)

    //             console.log('successfully send bio to database........', userReq)
    //             if (userReq.data.insertedId) {
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Your Request has been Sent",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }

    //         }
    //     })
    // }



    return (
        <div>
            {/* profile image */}
            <div>
                <div className="flex flex-col justify-center  p-6  rounded-xl sm:px-12 bg-sky-600 text-white">
                    <img src={item.photoUrl} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                    <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                        <div className="my-2 space-y-1">
                            <h2 className="text-xl font-semibold sm:text-2xl">{item.name}</h2>
                            <p>Your Id: {item.userId}</p>
                            <p>{item.email}</p>

                        </div>

                    </div>
                </div>
                {
                    payments || premium ?
                        <div>
                            {
                                userStatus === 'pending' && !premium ?
                                    <div className="w-full text-center mt-5">
                                        <div className="mt-10 ml-2 mb-10 ">
                                            <h1 className="border w-full mx-auto rounded-lg  flex items-center  gap-2 text-2xl font-bold bg-sky-600 text-white justify-center p-3  ">

                                                Premium Request is Pending <MdWorkspacePremium />
                                            </h1>

                                        </div>
                                    </div>
                                    :
                                    ''
                            }
                        </div>
                        :
                        <div>
                            <div className="mt-10 ml-2 mb-10 ">

                                <Link to='/dashboard/payment'>
                                    <button className="border w-full mx-auto rounded-lg  flex items-center  gap-2 text-2xl font-bold bg-sky-600 text-white justify-center p-3  hover:bg-orange-400">

                                        Make biodata To Premium <MdWorkspacePremium />
                                    </button>
                                </Link>
                            </div>
                        </div>
                }




                {/* <div className="mt-10 ml-2 mb-10 ">

                    <Link to='/dashboard/payment'>
                        <button className="border w-full mx-auto rounded-lg  flex items-center  gap-2 text-2xl font-bold bg-sky-600 text-white justify-center p-3  hover:bg-orange-400">

                            Make biodata To Premium <MdWorkspacePremium />
                        </button>
                    </Link>
                </div> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-10 w-full mt-10">


                {/* First Column */}
                <div className="space-y-4 ">
                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Name:</label>
                        <p>{item.name}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Fathers Name:</label>
                        <p>{item.fatherName}</p>
                    </div>


                    {/* Other select inputs */}
                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Occupation:</label>
                        <p>{item.occupation}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Present Division:</label>
                        <p>{item.presentDivision}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Contact Email:</label>
                        <p>{item.email}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Race:</label>
                        <p>{item.race}</p>
                    </div>


                    {/* Other input fields */}

                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Heigh:</label>
                        <p>{item.height} (ft)</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Expected Partner Height:</label>
                        <p>{item.expectedPartnerHeight}</p>
                    </div>

                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Expected Partner Age:</label>
                        <p>{item.expectedPartnerAge}</p>
                    </div>


                </div>

                {/* Second Column */}
                <div className="space-y-4 ">
                    {/* Other input fields */}


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Biodata Type:</label>
                        <p>{item.bioType}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Mothers Name:</label>
                        <p>{item.motherName}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Date of Birth:</label>
                        <p>{item.dateOfBirth}</p>
                    </div>



                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Permanent Division:</label>
                        <p>{item.parmanentDivision}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Mobile Number:</label>
                        <p>{item.mobileNumber}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Age:</label>
                        <p>{item.age}</p>
                    </div>


                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Weight:</label>
                        <p>{item.weight} (kg)</p>
                    </div>

                    <div className="form-group flex gap-3 items-center">
                        <label className="block text-gray-700 font-bold text-lg ">Expected Partner Weight:</label>
                        <p>{item.expectedPartnerAge} (kg)</p>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default ViewFullBiodata;