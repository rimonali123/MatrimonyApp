import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { Link,  useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hoock/useAxiosPublic";
import useAxiosSecure from "../../Hoock/useAxiosSecure";


const LogIn = () => {
    const navigate = useNavigate();
    const {loggedInUser, signInWithGoogle } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const handleLogin = e => {
        const email = e.email;
        const password = e.password;
        console.log(email, password);

        loggedInUser(email, password)
            .then(result => {
                console.log(result?.user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error(error.message)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Oops...",
                    text: "invalid user!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        navigate('/');




    };

    const googleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                   
                }
                axiosPublic.post('/users', userInfo)
                    .then( () => {
 
                    })
                    .catch(error => {
                        console.error(error.message)
                    })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Google Log In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });


                 // user bio data sending process in database
                 const userBiodata = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    fatherName: '',
                    motherName: '',
                    photoUrl: result.user?.photoURL,
                    biodataType: '',
                    occupation: '',
                    dateOfBirth: '',
                    presentDivision: '',
                    permanentDivision: '',
                    mobileNumber: '',
                    race: '',
                    age: '',
                    hight: '',
                    weight: '',
                    expectedPartnerHeight: '',
                    expectedPartnerWeight: '',
                    expectedPartnerAge: '',



                }

                axiosSecure.post('/usersBiodata', userBiodata)
                    .then(res => {
                        console.log(res.data)
                        console.log('biodata added to database .........')
                    })
                    .catch(error => {
                        console.error(error)
                    })
                console.log(userBiodata)




                navigate('/');
            })

            .catch(error => {
                console.error(error.message)
            })
    }


    return (
        <div className=" border-2 py-5 bg-sky-300  rounded-xl mt-24">
            <div>
                <h1 className="text-2xl md:text-4xl uppercase text-center py-5 text-red-600">Welcome Back ! please login</h1>
            </div>
            <div className=" md:w-1/2 lg:w-1/2 mx-auto border ">
                <h1 className="text-3xl text-center">Socila Log In</h1>
                <Button onClick={googleLogIn} color="secondary" className="mt-2 text-center w-full mx-auto"> < FcGoogle className=" text-5xl " /></Button>

            </div>
            <div className="flex py-5 md:w-1/2 lg:w-1/2 mx-auto items-center gap-5">
                <hr className="w-full border-black" />
                <h1>Or</h1>
                <hr className="w-full border-black" />
            </div>
            <div>
                <form onSubmit={handleSubmit(handleLogin)} >

                    <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto">
                        <label className="text-3xl">Your Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            name="email"
                            required
                            {...register("email", { required: true })}
                            className="border-2 border-black rounded-xl p-2 mt-2 " />
                    </div>

                    <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto">
                        <label className="text-3xl">Password</label>
                        <div className="flex items-center w-full ">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="password"
                                name="password"
                                required
                                {...register("password", { required: true })}
                                className="border-2 border-black rounded-xl p-2 mt-2 relative w-full " />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 md:right-[250px] lg:right-[500px] mt-1">
                                {
                                    showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />
                                }
                            </span>

                        </div>
                    </div>

                    <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto  mt-5">
                        
                        <input type="submit" value="Log In Now" className="bg-green-500 p-2 rounded-xl text-white hover:bg-green-900 text-xl " />
                    </div>

                    <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto  mt-5">
                        <h3 className="md:text-xl text-indigo-800">Dont have an account? please <Link to='/register' className="border-black underline">Register</Link></h3>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default LogIn;