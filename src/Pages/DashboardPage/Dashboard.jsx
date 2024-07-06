import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaRegEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { IoMdContact, IoMdLogOut } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdVerifiedUser, MdWorkspacePremium } from "react-icons/md";
import { GiLovers } from "react-icons/gi";
import { ImHappy } from "react-icons/im";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Provider/AuthProvider";
import useAdmin from "../../Hoock/useAdmin";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const { logout } = useContext(AuthContext);


    const handlelogout = () => {
        logout()
            .then(() => {
                console.log('LogOut Successfully')
            })
            .catch(error => {
                console.error(error.message)
            })
    }
    return (
        <div className="md:max-w-6xl mx-auto">
             <Helmet>
                <title>P.L || Dashboard</title>
            </Helmet>
            <div className="flex flex-col md:flex-row gap-10 justify-between">
                <div className="md:w-1/3 lg:w-1/4  border border-yellow-600 md:min-h-screen bg-sky-600">
                    <ul className="p-4  text-xl ">
                       {
                        isAdmin ? <>
                         <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <BiSolidDashboard />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/dashboard/adminDashboard'> Admin Dashboard </NavLink>
                        </li>
                        <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <FaUsers />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/dashboard/manageUser'>Manage Users</NavLink>
                        </li>
                        <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <MdWorkspacePremium />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/dashboard/approvedPremium'>Approved Premium</NavLink>
                        </li>

                        <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <MdVerifiedUser  />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/dashboard/approvedContactRequest'>Approved Contact Request</NavLink>
                        </li>
                        
                        <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <ImHappy  />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/dashboard/successStory'>Success Story</NavLink>
                        </li>
                        </>
                        :
                        <>
                         <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <FaRegEdit />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''}  to='/dashboard/editBiodata'>Edit Biodata</NavLink>
                        </li>

                        <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <FcViewDetails />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''}  to='/dashboard/viewBioData'>View Biodata</NavLink>
                        </li>

                        <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <GrFavorite/>
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''}  to='/dashboard/favoriteBioData'>Favourites Biodata</NavLink>
                        </li>

                        <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <IoMdContact />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''}  to='/dashboard/myContactRequest'>My Contact Request</NavLink>
                        </li>

                        <li className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <GiLovers />
                            <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''}  to='/dashboard/gotMarried'>Got Married</NavLink>
                        </li>
                        </>
                       }

                        <hr  className="w-full border mt-3 mb-3"/>

                        <li  className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <FaHome  />
                            <NavLink to='/'>Home</NavLink>
                        </li>

                        <li onClick={handlelogout} className="flex gap-2 items-center hover:border p-3 font-bold text-white">
                            <IoMdLogOut />
                            <NavLink>Log Out</NavLink>
                        </li>

                    </ul>

                </div>
                <div className="md:w-3/5 lg:w-2/3 border border-red-400">
                    <Outlet></Outlet>

                </div>
            </div>
            
        </div>
    );
};

export default Dashboard;