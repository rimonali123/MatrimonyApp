
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hoock/useAxiosPublic";
import useAxiosSecure from "../../Hoock/useAxiosSecure";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const navigate = useNavigate();
    const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();




    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                console.log(result?.user)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,

                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {

                                if (res.data.insertedId) {
                                    console.log('user added to database')
                                    Swal.fire({
                                        position: "middle",
                                        icon: "success",
                                        title: "Account Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })
                            .catch(error => {
                                console.error(error.message)
                            })


                        // user bio data sending process in database
                        const userBiodata = {
                            name: data.name,
                            email: data.email,
                            photoUrl: data.photoURL,
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





                    })
                    .catch()
                navigate('/')
            })
            .catch(error => {
                console.error(error.message)
            })

    }


    const googleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,

                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {

                    })
                    .catch(error => {
                        console.error(error.message)
                    })
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Google Log In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });


                // user bio data sending process in database
                const userBiodata = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photoUrl: result.user?.photoURL,
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
        <div className="mt-24">
            <div className=" border-2 py-5 bg-sky-300  rounded-xl">
                <div>
                    <h1 className="text-2xl md:text-4xl uppercase text-center py-5 text-red-600">Please Create your Account</h1>
                </div>
                <div className=" md:w-1/2 lg:w-1/2 mx-auto border ">
                    <h1 className="text-3xl text-center">Use Google</h1>
                    <Button onClick={googleLogIn} color="secondary" className="mt-2 text-center w-full mx-auto"> < FcGoogle className=" text-5xl " /></Button>

                </div>
                <div className="flex py-5 md:w-1/2 lg:w-1/2 mx-auto items-center gap-5">
                    <hr className="w-full border-black" />
                    <h1>Or</h1>
                    <hr className="w-full border-black" />
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto">
                            <label className="text-3xl">Your Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register("name", { required: true })}
                                className="border-2 border-black rounded-xl p-2 mt-2 " />
                        </div>
                        {errors.name && <span>This field is required</span>}

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
                        {errors.email && <span>This field is required</span>}

                        <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto">
                            <label className="text-3xl">Password</label>
                            <div className="flex items-center w-full ">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="password"
                                    name="password"
                                    required
                                    {...register("password", {
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/

                                    }, { required: true })}
                                    className="border-2 border-black rounded-xl p-2 mt-2 relative w-full " />
                                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 md:right-[250px] lg:right-[500px] mt-1">
                                    {
                                        showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />
                                    }
                                </span>

                            </div>
                            {
                                errors?.password?.type === 'pattern' && (
                                    <p className="text-red-500 mt-2">Password must have 6 characters or longer and  one Upper case and Lower case letter</p>
                                )
                            }
                        </div>
                        <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto">
                            <label className="text-3xl">Confirm Password</label>
                            <div className="flex items-center w-full ">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="confirmPassword"
                                    name="comfirmPassword"
                                    required
                                    {...register("confirmPassword", {
                                        validate: data => {
                                            if (watch('password') !== data) {
                                                return "Password didn't match"
                                            }
                                        }
                                    }, { required: true })}
                                    className="border-2 border-black rounded-xl p-2 mt-2 relative w-full " />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 md:right-[250px] lg:right-[500px] mt-1">
                                    {
                                        showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />
                                    }
                                </span>

                            </div>
                            <p className=" text-xl text-red-500 mt-2">{errors.confirmPassword?.message}</p>
                        </div>

                        <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto">
                            <label className="text-3xl">Photo url</label>
                            <input
                                type="url"
                                placeholder="photoURL"
                                required
                                {...register("photoURL", { required: true })}
                                className="border-2 border-black rounded-xl p-2 mt-2 " />
                        </div>


                        <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto  mt-5">

                            <input type="submit" value="Register Now" className="bg-green-500 p-2 rounded-xl text-white hover:bg-green-900 text-xl " />
                        </div>

                        <div className="flex flex-col md:w-1/2 lg:w-1/3 mx-auto  mt-5">
                            <h3 className="md:text-xl text-indigo-800">Already have an account? please <Link to='/login' className="border-black underline">Log In</Link></h3>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;