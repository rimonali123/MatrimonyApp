import { useQuery } from "@tanstack/react-query";
// import ManageUserTable from "../../../Components/AdminComponents/ManageUserTable";
import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import { MdWorkspacePremium } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/Provider/AuthProvider";
import { Helmet } from "react-helmet-async";


const ManageUser = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }

    })
    console.log(users)
    const userEmail = users?.map(us => us.roles)
    console.log(userEmail)


    const { data: payments } = useQuery({
        queryKey: ['userPaymentInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get('/userPaymentInfo');
            return res.data
        }

    })
    console.log(payments)
    // const match = payments?.map(s => {
    //     console.log(s.email)
    //     const pre = s?.email
    //     console.log(pre)
    //     return pre

    // })

    // console.log(match)
    // const prem = match?.map(s => {
    //     console.log(s)
    //     const prems = prem?.filter(e => e.s === userEmail)
    //     console.log(prems)
    // })

   
    const match = payments?.map(s => {
        console.log(s.email);
        return s?.email; 
    });

    console.log(match); 

   
    const prems = match?.filter(email => email.s?.email === userEmail);

    console.log(prems); 

    
    // const prem = payments
    //     ?.map(s => s?.email)
    //     ?.filter(email => email === userEmail); 

    // console.log(prem); 







    // const e = payments?.map(pay => pay?.email)
    // const em = e?.map(emm => emm.email)
    // console.log(em)


    // const {data : role} = useQuery({
    //     queryKey: ['userPaymentInfo'],
    //     queryFn: async () =>{
    //         const res = await axiosSecure.get(`/userPaymentInfo/${e}`)
    //     }
    // })
    // console.log(role)
    // const roleStatus = role?.map(roles => roles?.status)
    // console.log(roleStatus)

    // const p = payments?.status
    // console.log(p)

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Now user is an admin!",
                                text: `${user.name} is an admin.`,
                                icon: "success"
                            });
                        }
                    });
            }
        });

    }
    const handleMakePremimuUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, maked Premium!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();

                            Swal.fire({
                                title: "Now user is an Premium user!",
                                text: `${user.name} is an Premium user.`,
                                icon: "success"
                            });
                        }
                    });
            }
        })

    }
    return (
        <div>
             <Helmet>
                <title>P.L || Manage Users</title>
            </Helmet>
            <h1 className="text-center py-5 text-3xl font-bold">Manage All User : ({users.length})</h1>
            {/* <ManageUserTable users={users}></ManageUserTable> */}
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-base ">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <thead className="dark:bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">#</th>
                                <th className=" lg:text-xl text-center">User Name</th>
                                <th className=" lg:text-xl text-center">Email</th>
                                <th className=" lg:text-xl text-center">Action</th>
                                <th className=" lg:text-xl text-center">Make</th>
                            </tr>
                        </thead>

                        <tbody className="border bg-orange-300 ">
                            {
                                users?.map((user, index) =>
                                    <tr key={user._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50 ">
                                        <td className="p-3">
                                            <p>{index + 1}</p>
                                        </td>
                                        <td className="p-3 ">
                                            <p>{user.name}</p>
                                        </td>
                                        <td className="p-3 ">
                                            <p>{user.email}</p>
                                        </td>
                                        <td className="p-3 text-center">
                                            {user.role === 'admin' ? 'Admin' : <button onClick={() => { handleMakeAdmin(user) }} className="px-3 py-1 flex gap-2 items-center font-semibold rounded-md border hover:border-sky-700  dark:bg-violet-600 dark:text-gray-50">
                                                <span className="text-xl"><RiAdminFill /></span>
                                                <span>Make Admin</span>
                                            </button>}
                                        </td>

                                        <td className="p-3 text-center">
                                            {user.roles === 'premium' ? <p className="text-xl">Premium</p> : <button onClick={() => { handleMakePremimuUser(user) }} className="px-3 py-1 flex gap-2 items-center font-semibold rounded-md border hover:border-sky-700  dark:bg-violet-600 dark:text-gray-50">
                                                <span className="text-xl"><MdWorkspacePremium /></span>
                                                <span>Make Premium</span>
                                            </button>}
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

export default ManageUser;