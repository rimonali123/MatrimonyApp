import { useForm, } from "react-hook-form"
import useAxiosSecure from "../../../Hoock/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/Provider/AuthProvider";
import useAxiosPublic from "../../../Hoock/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const EditBiodataForm = ({ item }) => {
    const divisions = ['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansign', 'Sylhet', 'other'];
    const occupations = ['Engineer', 'Doctor', 'Teacher', 'Artist', 'Business Owner', 'Other'];
    const races = ['Asian', 'Japanese', 'Bangladeshi', 'Hispanic', 'Indian', 'Other'];
    // console.log(item);
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()

   


    const onSubmit = async (data) => {
        const imageFile = { image: data.photoUrl[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        });
        // console.log(res.data)



        if (res.data.success) {
            const userBio = {
                name: data.name || item?.name,
                bioType: data.bioType || item?.bioType,
                age: data.age || item?.age,
                fatherName: data.fatherName || item?.fatherName,
                motherName: data.motherName || item?.name,
                photoUrl: res.data.data.display_url || item?.photoUrl,
                race: data.race || item?.race,
                height: data.height || item?.height,
                weight: data.weight || item?.weight,
                occupation: data.occupation || item?.occupation,
                dateOfBirth: data.dateOfBirth || item?.dateOfBirth,
                mobileNumber: data.mobileNumber || item?.mobileNumber,
                presentDivision: data.presentDivision || item?.presentDivision,
                parmanentDivision: data.parmanentDivision || item?.parmanentDivision,
                expectedPartnerHeight: data.expectedPartnerHeight || item?.expectedPartnerHeight,
                expectedPartnerWeight: data.expectedPartnerWeight || item?.expectedPartnerWeight,
                expectedPartnerAge: data.expectedPartnerAge || item?.expectedPartnerAge,

            }

            const bioData = await axiosSecure.patch(`/usersBiodata/${data.email}`, userBio)
            // .then(res => {
            //     console.log('successfully send bio to database........', res)
            // })
            console.log('successfully send bio to database........', bioData)
            if (bioData.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Biodata has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        }



        // console.log(data)


    }


    return (
        <div className="mt-10 px-2">

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                    <div>
                        <label className="text-xl">Name</label>
                        <input type="text" {...register("name")} className="w-full border-2 rounded-lg p-2 border-black" />
                    </div>
                    <div>
                        <label className="text-xl">Biodata Type</label>
                        <input type="text" {...register("biodataType")} className="w-full border-2 rounded-lg p-2 border-black" />
                    </div>



                    <div>
                        <fieldset className="w-full space-y-1 dark:text-gray-800">
                            <label htmlFor="files" className="block text-xl font-medium">Your Photo</label>
                            <div className="flex">
                                <input type="file" name="files" id="files" className=" px-2 py-3 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100" />
                            </div>
                        </fieldset>
                    </div>

                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    <div className="space-y-4">
                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={item?.name}
                                {...register('name')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Fathers Name:</label>
                            <input
                                type="text"
                                name="fatherName"
                                {...register('fatherName')}
                                defaultValue={item?.fatherName}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Occupation:</label>
                            <select
                                defaultValue={item?.occupation}
                                name="occupation"
                                {...register('occupation')}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">{item?.occupation || 'Select'}</option>
                                {occupations.map((occupation, index) => (
                                    <option key={index} value={occupation}>{occupation}</option>
                                ))}
                            </select>
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Present Division:</label>
                            <select

                                defaultValue={item?.presentDivision}
                                name="presentDivision"
                                {...register('presentDivision')}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">{item?.presentDivision || 'Select'}</option>
                                {divisions.map((division, index) => (
                                    <option key={index} value={division}>{division}</option>
                                ))}
                            </select>
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Contact Email:</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                {...register('email')}
                                readOnly
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Race:</label>
                            <select
                                defaultValue={item?.race}
                                {...register('race')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">{item?.race || 'Select'}</option>
                                {races.map((race, index) => (
                                    <option key={index} value={race}>{race}</option>
                                ))}
                            </select>
                        </div>



                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Height (ft):</label>
                            <input
                                type="number"
                                defaultValue={item?.height}
                                {...register('height')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Expected Partner Height (ft):</label>
                            <input
                                type="number"
                                {...register('expectedPartnerHeight')}
                                defaultValue={item?.expectedPartnerHeight}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Choose Profile Image:</label>
                            <input
                                type="file"
                                {...register('photoUrl')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>


                    </div>

                    <div className="space-y-4">


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Biodata Type:</label>
                            <select
                                defaultValue={item?.bioType}
                                {...register('bioType')}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">{item?.bioType || 'Select'}</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Mothers Name:</label>
                            <input
                                type="text"
                                defaultValue={item?.motherName}
                                {...register('motherName')}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Date of Birth:</label>
                            <input
                                type="date"
                                defaultValue={item?.dateOfBirth}
                                {...register('dateOfBirth')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>



                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Permanent Division:</label>
                            <select
                                defaultValue={item?.parmanentDivision}
                                {...register('parmanentDivision')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">{item?.parmanentDivision || 'Select'}</option>
                                {divisions.map((division, index) => (
                                    <option key={index} value={division}>{division}</option>
                                ))}
                            </select>
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Mobile Number:</label>
                            <input
                                type="number"
                                defaultValue={item?.mobileNumber}
                                {...register('mobileNumber')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Age:</label>
                            <input
                                type="number"
                                defaultValue={item?.age}
                                {...register('age')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>


                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Weight (kg):</label>
                            <input
                                type="number"
                                defaultValue={item?.weight}
                                {...register('weight')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Expected Partner Weight (kg):</label>
                            <input
                                type="number"
                                defaultValue={item?.expectedPartnerWeight}
                                {...register('expectedPartnerWeight')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Expected Partner Age (From - To):</label>
                            <input
                                type="number"
                                defaultValue={item?.expectedPartnerAge}
                                {...register('expectedPartnerAge')}

                                placeholder="e.g., 25 - 30"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                    </div>
                </div>


                <div className="mt-4">
                    <input type="submit" value={'Save and Publish'} className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"

                    />
                </div>
            </form>

        </div>
    );
};

export default EditBiodataForm;

