import { MdWorkspacePremium } from "react-icons/md";
import useAxiosSecure from "../../Hoock/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const ApprovePremiumTable = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments, refetch } = useQuery({
        queryKey: ['userPaymentInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get('/userPaymentInfo');
            return res.data
        }

    })
    console.log(payments)


    const handleApprovePremimu = payment => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approved!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/userPaymentInfo/${payment._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Now user is an premium user!",
                                text: `${user.name} is an premium user.`,
                                icon: "success"
                            });
                        }
                    });
            }
        });

    }

    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">

                <div className="overflow-x-auto">
                    <table className="min-w-full text-base">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <thead className="dark:bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">#.</th>
                                <th className="p-3 text-center">User Name</th>
                                <th className="p-3 text-center">Bio data id</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="border bg-black w-full text-white">
                            {
                                payments?.map(payment =>
                                    <tr key={payment._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                        <td className="p-3">
                                            <p>1</p>
                                        </td>
                                        <td className="p-3 text-center">
                                            <p>{payment.name}</p>
                                        </td>
                                        <td className="py-3 text-center">
                                            <p>{payment.userId}</p>
                                        </td>

                                        <td className="flex  justify-center items-center mt-2">
                                            {payment.status === 'premium' ? <p className="text-xl">Approved</p> :
                                                <button onClick={() => { handleApprovePremimu(payment) }} className="px-3 py-1 flex gap-2 items-center font-semibold rounded-md border hover:bg-sky-700 hover:border-orange-400  dark:bg-violet-600 dark:text-gray-50">
                                                    <span className="text-xl"><MdWorkspacePremium /></span>
                                                    <span>Make Premium</span>
                                                </button>
                                            }

                                        </td>

                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApprovePremiumTable;