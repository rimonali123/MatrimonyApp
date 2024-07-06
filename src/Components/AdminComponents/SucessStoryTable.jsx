import { useQuery } from "@tanstack/react-query";
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useAxiosPublic from "../../Hoock/useAxiosPublic";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Rating } from '@smastrom/react-rating'
import { Helmet } from "react-helmet-async";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SucessStoryTable = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState(null);

    const handleOpen = (story) => {
        setSelectedStory(story);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const axiosPublic = useAxiosPublic();

    const { data: stories } = useQuery({
        queryKey: ['usersReview'],
        queryFn: async () => {
            const res = await axiosPublic.get('usersReview');
            return res.data;
        }
    });

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
             <Helmet>
                <title>P.L || Success Story</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="min-w-full text-base">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead className="dark:bg-gray-300">
                        <tr className="text-center">
                            <th className="p-3">#</th>
                            <th className="p-3 text-center">Male Bio Id</th>
                            <th className="p-3 text-center">Female Bio Id</th>
                            <th className="px-10 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="border bg-black w-full text-white">
                        {stories?.map((item, index) => (
                            <tr key={item._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 text-center">
                                    <p>{item.selfBio}</p>
                                </td>
                                <td className="p-3 text-center">
                                    <p>{item.pertnerBio}</p>
                                </td>
                                <td className="p-3 text-right">
                                    <button
                                        onClick={() => handleOpen(item)}
                                        className="px-3 py-1 flex gap-2 items-center font-semibold rounded-md border hover:border-sky-700 dark:bg-violet-600 dark:text-gray-50"
                                    >
                                        View Story
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                className="modal"
            >
                <Box sx={style}>
                  

                    <Card sx={{ maxWidth: 345 }} className='border border-sky-800 h-[500px]'>
                        <CardMedia
                            className='h-80'
                            component="img"
                            alt="green iguana"
                            image={selectedStory?.photoUrl}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                <h1>Marriage Date: {selectedStory?.marriageDate}</h1>
                            </Typography>
                            <div className='flex gap-2'>
                                Rating :  <Rating
                                    style={{ maxWidth: 100 }}
                                    value={selectedStory?.rating}
                                    readOnly
                                />
                            </div>

                            <Typography variant="body2" color="text.secondary">
                                {selectedStory?.texArea}
                            </Typography>
                        </CardContent>

                    </Card>
                </Box>
            </Modal>
        </div>
    );
};

export default SucessStoryTable;