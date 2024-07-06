import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hoock/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const GotMarried = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();

   

    const onSubmit = async (data) => {
        const imageFile = { image: data.photoUrl[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        });
        console.log(res.data)
        if (res.data.success) {
            const usersReview = {
                selfBio: data.selfBio,
                pertnerBio: data.pertnerBio,
                rating: data.rating,
                texArea: data.texArea,
                marriageDate: data.marriageDate,
                photoUrl: res.data.data.display_url,

            }

            const userReview = await axiosPublic.post(`/usersReview`, usersReview)
           
            console.log('successfully send bio to database........', userReview)
            
            if (userReview.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Review has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        }



        console.log(data)


    }

    return (
        <div className="px-3">
             <Helmet>
                <title>P.L || Got Marriage</title>
            </Helmet>
            <h1 className="text-xl font-bold text-center text-sky-700 py-2 mb-10">Give Your Review</h1>

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="">
                        <label className="block text-gray-700 font-semibold mb-2">Self Biodata Id:</label>
                        <input
                            type="number"
                            name="selfBio"
                            placeholder="e.g_ 35"
                            {...register('selfBio')}

                            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 font-semibold mb-2">Pertnar Biodata Id:</label>
                        <input
                            type="number"
                            name="pertnerBio"
                            placeholder="e.g_ 34"
                            {...register('pertnerBio')}

                            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 font-semibold mb-2">Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            placeholder="e.g_ 4 star"
                            {...register('rating')}

                            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="">
                            <label className="block text-gray-700 font-semibold mb-2">Choose Marriage Date:</label>
                            <input
                                type="date"
                                {...register('marriageDate')}

                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                </div>

                

                <div className="mt-3">
                    <label className="block text-gray-700 font-semibold mb-2">Success Story Review:</label>
                    <textarea 
                    className="border rounded-lg w-full p-2" 
                    name="texArea" 
                    placeholder="explain your opinion about us..."
                    {...register('texArea')}
                    id="" cols="100" 
                    rows="5">

                    </textarea>
                </div>


                <div className="mt-3">
                    <label className="block text-gray-700 font-semibold mb-2">Choose Profile Image:</label>
                    <input
                        type="file"
                        {...register('photoUrl')}

                        className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <input type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"

                    />
                </div>

            </form>


        </div>
    );
};

export default GotMarried;