import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hoock/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Provider/AuthProvider";


const FavoriteBiodataTable = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: item, refetch } = useQuery({
        queryKey: ['favoriteBiodata'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favoriteBiodata/${user?.email}`)
            return res.data
        }
    })
    // console.log(item)


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
              const res = await axiosSecure.delete(`/favoriteData/${_id}`);
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
                                <th className="p-3 ">Permanent Division</th>
                                <th className="p-3">Occupation</th>
                                <th className="p-3 text-center ">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                item?.map((i, index) =>
                                    <tr key={i._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                        <td className="p-3">
                                            <p>{index + 1}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{i.name}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{i.userId}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{i.parmanentDivision}</p>
                                        </td>
                                        <td className="p-3 ">
                                            <p>{i.occupation}</p>
                                        </td>

                                        <td className="p-3 text-center ">
                                            <button
                                                onClick={() => handleDelete(i._id)}
                                                className="  text-red-600 text-3xl px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                                <MdDeleteForever />
                                            </button>
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

export default FavoriteBiodataTable;