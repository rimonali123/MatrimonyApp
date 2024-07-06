// import { useContext } from "react";
// import useAxiosSecure from "./useAxiosSecure";
// import { AuthContext } from "../Authentication/Provider/AuthProvider";
// import { useQuery } from "@tanstack/react-query";


// const useAdmin = () => {
//   const {  user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();
//     const { data: isAdmin, isPending: isAdminLoading } = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/admin/${user.email}`);
//             console.log(res.data);
//             return res.data?.admin;
//         }
//     })
//     return [isAdmin, isAdminLoading]
// };

// export default useAdmin;


import { useContext } from "react";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  console.log({user, loading})
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/admin/${ user?.email }`);
        console.log(res.data);
        return res.data?.admin;
      }
    },
    gcTime:0

  })
  // console.log(user?.role)

  return [isAdmin, isAdminLoading];
};

export default useAdmin;


