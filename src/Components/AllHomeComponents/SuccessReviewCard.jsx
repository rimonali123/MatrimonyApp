
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Rating } from '@smastrom/react-rating'


const SuccessReviewCard = ({data}) => {
    return (
        <div>
            <Card sx={{ maxWidth: 420 }} className='border border-sky-800 h-[500px]'>
                <CardMedia
                className='h-80'
                    component="img"
                    alt="green iguana"
                    image={data.photoUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        <h1>Marriage Date: {data.marriageDate}</h1>
                    </Typography>
                    <div className='flex gap-2'>
                        Rating :  <Rating
                            style={{ maxWidth: 100 }}
                            value={data.rating}
                            readOnly
                        />
                    </div>

                    <Typography variant="body2" color="text.secondary">
                       {data.texArea}
                    </Typography>
                </CardContent>

            </Card>

            
        </div>
    );
};

export default SuccessReviewCard;