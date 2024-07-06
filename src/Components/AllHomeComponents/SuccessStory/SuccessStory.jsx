

import '@smastrom/react-rating/style.css'
import SuccessReviewCard from '../SuccessReviewCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hoock/useAxiosPublic';
import { useState } from 'react';

const SuccessStory = () => {
    const axiosPublic = useAxiosPublic();

    const { data: review } = useQuery({
        queryKey: ['usersReview'],
        queryFn: async () => {
            const res = await axiosPublic.get('/usersReview');
            return res.data;
        }
    });
    console.log(review)


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = review?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div>
            
            <div>
                <h1 className='text-3xl text-center mt-10'> Success Stories & Counting</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-10'>

                {
                    currentItems?.map(data => 
                    <SuccessReviewCard
                    key={data._id}
                    data={data}
                    ></SuccessReviewCard>)
                }

            </div>
            <div className="mt-5 flex justify-end">
                        {review && (
                            <nav className="pagination">
                                <ul className="flex list-none">
                                    {Array.from({ length: Math.ceil(review.length / itemsPerPage) }, (_, i) => (
                                        <li key={i} className="cursor-pointer mx-1">
                                            <button
                                                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                                onClick={() => paginate(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
            
        </div>
    );
};

export default SuccessStory;