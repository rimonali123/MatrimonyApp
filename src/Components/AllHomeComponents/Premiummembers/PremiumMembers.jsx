import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hoock/useAxiosPublic';
import PremiumMemberCard from './PremiumMemberCard';
import { useState } from 'react';
// import { useState } from 'react';

const PremiumMembers = () => {
    const axiosPublic = useAxiosPublic();
   

    const { data: items } = useQuery({
        queryKey: ['usersBiodata'],
        queryFn: async () => {
            const res = await axiosPublic.get('/usersBiodata', {
            });
            return res.data;
        }
    });
    
    const dataItem = items?.slice(2,8)
    console.log(dataItem)
    


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataItem?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='mt-20 mb-24'>
            <div>
                <h1 className="text-3xl text-center font-bold">Our Premium Members</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-10'>
                {currentItems?.map(data => (
                    <PremiumMemberCard
                        key={data._id}
                        data={data}
                    />
                ))}
            </div>
            <div className="mt-5 flex justify-end">
                        {dataItem && (
                            <nav className="pagination">
                                <ul className="flex list-none">
                                    {Array.from({ length: Math.ceil(dataItem.length / itemsPerPage) }, (_, i) => (
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
            {/* <div className="flex justify-center mt-4">
                <button
                    onClick={() => setPage(prevPage => prevPage - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded mr-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(prevPage => prevPage + 1)}
                    disabled={items.length < pageSize}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Next
                </button>
            </div> */}

            
        </div>
    );
};

export default PremiumMembers;