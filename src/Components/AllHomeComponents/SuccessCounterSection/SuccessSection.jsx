import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import useAxiosPublic from '../../../Hoock/useAxiosPublic';


const SuccessSection = () => {
    const axiosPublic = useAxiosPublic();

    const { data: biodata } = useQuery({
        queryKey: ['usersBiodata'],
        queryFn: async () => {
            const result = await axiosPublic.get('usersBiodata')
            return result.data
        }
    })
    console.log(biodata)


    const { data: cupple } = useQuery({
        queryKey: ['usersReview'],
        queryFn: async () => {
            const result = await axiosPublic.get('usersReview')
            return result.data
        }
    })
    // console.log(cupple)


    const filteredMale = biodata?.filter(item => item.bioType === 'Male');
    // console.log(filteredMale);

    const totalMaleBio = filteredMale?.length
    // console.log(totalMaleBio)


    const filteredFemale = biodata?.filter(item => item.bioType === 'Female');
    // console.log(filteredFemale?.length);

    const totalFemaleBio = filteredFemale?.length
    // console.log(totalFemaleBio)


    



    return (
        <div className="mt-20">
            <h1 className="text-3xl text-center mb-10">Our Success Counting</h1>
            <div className="w-full flex items-center px-4 justify-between bg-sky-600 h-32">
                <div className="flex flex-col md:text-3xl text-white text-center">
                    <h3>Total Grooms Data</h3>
                    <p>
                        <CountUp
                            start={0}
                            end={totalMaleBio}
                            duration={15}
                        ></CountUp>
                    </p>
                </div>

                <div className="flex flex-col md:text-3xl text-white text-center">
                    <h3>Total Brides Data</h3>
                    <p><CountUp
                        start={0}
                        end={totalFemaleBio}
                        duration={15}
                    ></CountUp></p>
                </div>

                <div className="flex flex-col md:text-3xl text-white text-center">
                    <h3>Total Cupples Data</h3>
                    <p>
                        <CountUp
                            start={0}
                            end={cupple?.length}
                            duration={15}
                        ></CountUp>
                    </p>
                </div>

                <div className="flex flex-col md:text-3xl text-white text-center">
                    <h3>Total Members Data</h3>
                    <p>
                        <CountUp
                            start={0}
                            end={biodata?.length}
                            duration={10}
                        ></CountUp>
                    </p>
                </div>


            </div>
        </div>
    );
};

export default SuccessSection;