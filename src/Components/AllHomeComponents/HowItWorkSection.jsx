
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { CiEdit } from "react-icons/ci";
import { TiAdjustBrightness } from "react-icons/ti";
import { MdWifiCalling3 } from "react-icons/md";

const HowItWorkSection = () => {
    return (
        <div className='bg-sky-600 p-5'>
            <div>
                <h1 className='text-3xl font-bold text-center text-white'>How does it work</h1>
                <p className='md:w-[700px] mx-auto text-white'>Our Permanent love , matrimony website work step by step  with very efficiently and certainly.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-5 px-10'>
                <Card sx={{ maxWidth: 345 }} className='border border-sky-700 '>
                    <CiEdit className='text-7xl mx-auto'></CiEdit>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Write
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Here you will Write about yourself, your proficient, your characteristics, your hight-weight and so many details about you.
                        </Typography>
                    </CardContent>

                </Card>


                <Card sx={{ maxWidth: 345 }} className='border border-sky-700 '>
                    <TiAdjustBrightness className='text-7xl mx-auto'></TiAdjustBrightness>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Seen
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           When other user will see your profile and other info, and if the user satisfied and like your characteristics, he find your other info like as contact number and address.
                        </Typography>
                    </CardContent>

                </Card>


                <Card sx={{ maxWidth: 345 }} className='border border-sky-700 '>
                    <MdWifiCalling3 className='text-7xl mx-auto'></MdWifiCalling3>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Contact
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            If any user can like any persion characteristics he will find her address or contact info . And if feel free both candidates are chat of make call and talk himeself for know more .
                        </Typography>
                    </CardContent>

                </Card>
            </div>
        </div>
    );
};

export default HowItWorkSection;