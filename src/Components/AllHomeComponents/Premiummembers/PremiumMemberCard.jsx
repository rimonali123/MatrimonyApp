import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const PremiumMemberCard = ({data}) => {

    
    return (
        <div>
            
             <Card sx={{ Width: 345 }}>
                    <CardActionArea>
                        <CardMedia className='h-96 w-60'
                            component="img"
                            height="140"
                            image={data.photoUrl}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom component="div">
                                <h1 className='text-sm'>Bio data_id : {data.userId}</h1>
                                <h1 className='text-sm'>Bio data_type : {data.bioType}</h1>

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <p>permanent_division : {data.parmanentDivision}</p>
                                <p>Age : {data.age}</p>
                                <p>Occupation : {data.occupation}</p>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link to={`/viewBiodataDetails/${data?._id}`} ><Button size="small" color="primary">
                            View profile
                        </Button></Link>
                    </CardActions>
                </Card>
        </div>
    );
};

export default PremiumMemberCard;