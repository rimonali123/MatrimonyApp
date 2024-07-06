import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import CardTable from './CardTable';
import { Link } from 'react-router-dom';

const BioDataCard = ({ item, bioLength }) => {
    let lastId = bioLength
    const newId = lastId
    console.log(newId)
    return (
        <div>

            <div className="rounded-md shadow-md  dark:bg-gray-50 dark:text-gray-800 border-orange-300 border">
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-2">
                        <img src={item.photoUrl} alt="" className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300" />
                        <div className="-space-y-1">
                            <h2 className="text-lg font-semibold leading-none">{item.name}</h2>
                            <span className="inline-block text-xs font-semibold leading-none dark:text-gray-600">Biodata id: {item.userId || newId}</span>
                        </div>
                    </div>

                </div>
                <div className="p-3">
                    <CardTable item={item} bioLength={bioLength}></CardTable>
                </div>
                <div className="p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full ">

                            <button type="button" title="Share post" className="flex gap-1 items-center  justify-center">
                                Share <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                    <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"></path>
                                </svg>
                            </button>

                            <Link 
                            to={`/viewBiodataDetails/${item?._id}`}
                            >
                                <button type="button" title="Add a comment" className="flex items-center  justify-center">View Profile
                                    <ViewHeadlineIcon />
                                </button>
                            </Link>



                        </div>

                    </div>
                </div>
            </div>





        </div>
    );
};

export default BioDataCard;