import { Helmet } from "react-helmet-async";


const ContactUs = () => {
    return (
        <div className='mt-40'>
             <Helmet>
                <title>P.L || Contact Us</title>
            </Helmet>
            <h1 className="text-red-400 text-2xl font-medium">Contact us </h1>
            <hr className="w-ful border font-bold border-dotted mt-3" />
            <h1 className=" py-4 text-2xl font-bold bg-gradient-to-r from-green-700 via-red-500 to-green-700 text-transparent bg-clip-text bg-300% animate-gradient">Bangladesh</h1>
            <p className="text-xl bg-gradient-to-r from-green-700 via-red-500 to-green-700 text-transparent bg-clip-text bg-300% animate-gradient">Bangladeshi Permanent Love Matrimony Private Ltd.(Trade Licence no. 143176)</p>
            <p className="font-bold">Registered address:</p>
            <p>169, Shanti Niketon, <br />
                Tejgaon Industrial Area, Dhaka-1208
            </p>
            <p className="font-bold">Operating address:</p>
            <p>House 15/A, (1st Floor), Road 5 (Front Road #8), Block F, <br />
                Banani, Dhaka-1213.
            </p>
            <p className="py-4 text-red-500"> Note: 
            This website is strictly for matrimonial purpose only and not a dating website
            </p>
        </div>
    );
};

export default ContactUs;