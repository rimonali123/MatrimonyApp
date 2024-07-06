import { RiAdminFill } from "react-icons/ri";
import { MdWorkspacePremium } from "react-icons/md";

const ManageUserTable = () => {

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
                                <th className="p-3">User Name</th>
                                <th className="p-3">Email</th>
                            </tr>
                        </thead>
                        
                        <tbody className="border bg-orange-300 w-full">
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3">
                                    <p>1</p>
                                </td>
                                <td className="p-3 ">
                                    <p>Microsoft Corporation</p>
                                </td>
                                <td className="p-3 ">
                                    <p>abc@gmail.com</p>
                                </td>
                                <td className="p-3 text-right">
                                    <button className="px-3 py-1 flex gap-2 items-center font-semibold rounded-md border hover:border-sky-700  dark:bg-violet-600 dark:text-gray-50">
                                        <span className="text-xl"><RiAdminFill /></span>
                                        <span>Make Admin</span>
                                    </button>
                                </td>
                                <td className="p-3 text-right">
                                    <button className="px-3 py-1 flex gap-2 items-center font-semibold rounded-md border hover:border-sky-700  dark:bg-violet-600 dark:text-gray-50">
                                        <span className="text-xl"><MdWorkspacePremium /></span>
                                        <span>Make Premium</span>
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

export default ManageUserTable;