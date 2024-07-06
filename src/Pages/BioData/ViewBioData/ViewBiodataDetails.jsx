
import { Link, useLoaderData } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const ViewBiodataDetails = () => {
    const allData = useLoaderData();
    // console.log(allData)
    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);

    const { data: payments } = useQuery({
        queryKey: ['paymentInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentInfo/${user?.email}`);
            return res.data
        }

    })
    // console.log(payments)
    const userStatus = payments?.status
    // console.log(userStatus)


    const { data: users } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data
        }

    })
    // console.log(users)

    
    const premium = users?.roles
    // console.log(premium)



    const handleAddData = async () => {
        try {
            const bioData = {
                email : user?.email,
                name: allData?.name,
                userId: allData?.userId,
                parmanentDivision: allData?.parmanentDivision,
                occupation: allData?.occupation,
            };


            const response = await axiosSecure.post(`/favoriteBiodata/${allData._id}`, bioData);

            console.log('Successfully sent favorite biodata to database:', response.data);
            if (response.data.insertedId) {

                Swal.fire({
                    position: "center-start",
                    icon: "success",
                    title: "Your Favorite Biodata has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.error('Error adding favorite biodata:', error);
            if (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Oops...",
                    text: "Biodata already added to favorite!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };


    return (
        <div className="mt-28">
             <Helmet>
                <title>P.L || View Biodata Details</title>
            </Helmet>


            <div className="flex flex-col justify-center  p-6  rounded-xl sm:px-12 bg-sky-600 text-white">
                <img src={allData.photoUrl} alt="" className="w-44 h-44 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y dark:divide-gray-300 ">
                    <div className="my-2 space-y-1">
                        <h2 className="text-4xl font-bold ">{allData.name}</h2>
                        <p>Your Id: {allData.userId}</p>




                        <button
                            onClick={handleAddData}
                        >
                            <Tooltip title="Make this Favorite" placement="left">
                                <span className="text-7xl absolute mt-[-90px] ml-[100px] md:ml-[300px] lg:mt-[-100px] lg:ml-[400px] hover:text-orange-500 "><MdOutlineFavoriteBorder /></span>
                            </Tooltip>
                        </button>

                    </div>


                </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2">

                <div className="sm:p-4 dark:text-gray-800">

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <colgroup>

                                <col />
                                <col />
                            </colgroup>

                            <tbody className="text-xl">
                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Name</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.name}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Biodata Type</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.bioType}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Father Name</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.fatherName}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Mother name</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.motherName}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Date of birth</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.dateOfBirth}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Occupation</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.occupation}</p>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="sm:p-4 dark:text-gray-800">

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <colgroup>

                                <col />
                                <col />
                            </colgroup>

                            <tbody className="text-xl">
                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Permanent Division</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.parmanentDivision}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Present Division</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.presentDivision}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Age</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.age}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Height</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.height}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Weight</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.weight}</p>
                                    </td>
                                </tr>

                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3 border-r">
                                        <p>Race</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.race}</p>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {
                payments || premium ?
                    <div>
                        {
                            userStatus === 'pending'  && !premium ?
                                <div className="w-full text-center mt-5">
                                    
                                        <h1 className="text-white text-2xl  font-bold bg-sky-600 border-4 border-yellow-500 rounded-lg p-3 hover:bg-black hover:border-red-400">Contact Request is pending to Admin
                                        </h1>
                                    
                                </div>
                                :
                                <div>
                                    <h1 className="text-2xl text-center font-bold text-sky-800 py-3">Contact Information</h1>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <colgroup>

                                                <col />
                                                <col />
                                            </colgroup>

                                            <tbody className="text-xl">


                                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                                    <td className="p-3 border-r">
                                                        <p>Email</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p>{allData.email}</p>
                                                    </td>
                                                </tr>

                                                <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                                    <td className="p-3 border-r">
                                                        <p>Mobile</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p>{allData.mobileNumber}</p>
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                        }
                    </div>
                    :
                    <div>
                        <div className="w-full text-center mt-5">
                            <Link to='/dashboard/payment'>
                                <button className="text-white text-2xl uppercase font-bold bg-sky-600 border-4 border-yellow-500 rounded-lg p-3 hover:bg-black hover:border-red-400">Contact Request
                                </button>
                            </Link>
                        </div>
                    </div>
            }





        </div>
    );
};

export default ViewBiodataDetails;