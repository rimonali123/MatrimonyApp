import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Authentication/Provider/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "../../Hoock/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";


const ContactRequestTable = () => {
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

    const handleDelete = async (_id) => {
        console.log('delete button click by id :', _id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/contactRequest/${_id}`);
                    console.log("Delete response:", res.data);


                    Swal.fire({
                        title: "Deleted!",
                        text: "Your favorite biodata has been deleted.",
                        icon: "success"
                    });

                    refetch()


                } catch (error) {
                    console.error("Error deleting favorite biodata:", error);

                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete favorite biodata.",
                        icon: "error"
                    });
                }
            }
        });
    };


    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="dark:bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">#.</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Biodata Id</th>
                                <th className="p-3 ">Mobile no.</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3">
                                    <p>1</p>
                                </td>
                                <td className="p-3">
                                    <p>{payments?.name}</p>
                                </td>
                                <td className="p-3 text-center">
                                    <p>{payments?.userId}</p>
                                </td>
                                <td className="p-3">
                                    <p>{payments?.mobileNumber}</p>
                                </td>
                                <td className="p-3">
                                    <p>{payments?.email}</p>
                                </td>
                                <td className="p-3 ">
                                    <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                        <span>{payments?.status}</span>
                                    </span>
                                </td>
                                <td className="p-3 text-center ">
                                    <button
                                        onClick={() => handleDelete(payments._id)}
                                        className="  text-red-600 text-3xl px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                        <MdDeleteForever />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactRequestTable;