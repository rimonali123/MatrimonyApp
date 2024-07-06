
import { Helmet } from "react-helmet-async";
import HowItWorkSection from "../../Components/AllHomeComponents/HowItWorkSection";
import PremiumMembers from "../../Components/AllHomeComponents/Premiummembers/PremiumMembers";
import Slider from "../../Components/AllHomeComponents/Slider/Slider";
import SuccessSection from "../../Components/AllHomeComponents/SuccessCounterSection/SuccessSection";
import SuccessStory from "../../Components/AllHomeComponents/SuccessStory/SuccessStory";


const Home = () => {
    return (
        <div>
             <Helmet>
                <title>P.L || Home</title>
            </Helmet>
            <Slider></Slider>
            <PremiumMembers></PremiumMembers>
            <HowItWorkSection></HowItWorkSection>
            <SuccessSection></SuccessSection>
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;