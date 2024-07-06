import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Provider/AuthProvider";


const AboutUs = () => {
   const {user} = useContext(AuthContext)
    return (
        <div>
            <Helmet>
                <title>P.L || About Us</title>
            </Helmet>
            <div className='mt-40'>
                <h1 className="text-red-400 text-2xl font-medium">About us </h1>
                <hr className="w-ful border font-bold border-dotted mt-3 mb-3" />
                <p>Permanent Love  Bangladeshi Matrimony Ltd is the No.1 most trusted matrimony site for Bangladeshi brides and grooms. Lakhs of members have successfully found their life partners here! Browse through our vast selection of profiles from all major sects such as Sunnis, Shia, Deobandi, Barelvi & Dawoodi Bohra, etc. You can also find top quality profiles that belong to Muslim, Buddhist, Hindu, Christian and other communities.
                    <br />
                    <br />
                    With over 21 years of experience in the matchmaking industry, we are the pioneers in helping lakhs of brides and grooms find their perfect soulmates. Moreover, we have also earned the reputation of being the best Bengali matrimony site in Bangladesh! Register for FREE and find your perfect soulmate on BangladeshiMatrimony.</p>

                <h3 className="text-2xl font-semibold text-blue-600 py-5">Search for NRI Bangladeshi brides and grooms</h3>
                <hr className="w-ful border font-bold border-dotted mb-3" />
                <p>You can also meet Bangladeshi brides and grooms from NRI communities spread all across the globe! Take a look at our wide selection of quality profiles and get ready to find your perfect life partner today!
                    <br />
                    <br />
                    On Matrimony platfrom, you can also find domestic profiles to choose from cities such as Dhaka, Sylhet, Khulna, Chittagong, Rajshahi, Barisal, Tongi, Bogra and much more. Join FREE Now and begin your happy journey today!</p>

                <h3 className="text-2xl font-semibold py-5">Highlights of Permanent Love Matrimony:</h3>
                <hr className="w-ful border font-bold border-dotted mb-3" />

                <p>
                    <li>100% privacy guaranteed. Safe and secure site.</li>

                    <li>Free and easy profile registration</li>

                    <li> Registered profiles are manually screened and validated to ensure they meet the norms of our site</li>

                    <li>Innumerable privileges for the premium members and standard benefits for the free members</li>

                    <li> Registered members can see matching profiles daily by notification & e-mail!</li>

                    <li>Special ADD-ON packages to enhance partner search</li>

                    <li>Easy payment options</li>

                    <li> Enhanced privacy features to protect your personal details</li>

                    <li>Global and wide set of profiles including NRIs</li>

                    <li>E-mail alerts and notifications when members contact each other
                    </li>

                    <li>User-friendly interface and features for easy partner search</li>

                </p>
            </div>
            <h1 className="text-2xl font-bold text-green-500 py-5">Get started! Find a suitable match NOW. 
            { !user &&<Link to='/register' className="underline text-blue-500">Register Free Today!</Link>}
            </h1>
        </div>
    );
};

export default AboutUs;