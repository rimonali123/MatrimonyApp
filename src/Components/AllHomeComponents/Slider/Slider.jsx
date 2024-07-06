import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



const Slider = () => {
    return (
        <div className='mt-28'>
            <Carousel>
                <div className='h-[500px]'>
                    <img className='h-full' src='https://i.ibb.co/2ZFK4vT/banner.webp' />
                </div>
                <div className='h-[500px]'>
                    <img className='h-full' src='https://i.ibb.co/2ZFK4vT/banner.webp' />
                </div>
                <div className='h-[500px]'>
                    <img className='h-full' src='https://i.ibb.co/2ZFK4vT/banner.webp' />
                </div>
                <div className='h-[500px]'>
                    <img className='h-full' src='https://i.ibb.co/2ZFK4vT/banner.webp' />
                </div>
                <div className='h-[500px]'>
                    <img className='h-full' src='https://i.ibb.co/2ZFK4vT/banner.webp' />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;