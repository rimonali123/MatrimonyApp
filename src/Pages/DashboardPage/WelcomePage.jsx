import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <div className="bg-sky-600 lg:min-h-screen  text-white">
            <h1 className="lg:text-4xl py-5 text-center font-bold  bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF4500]">
                Welcome to our Matrimony site
            </h1>


            <div className=" items-center justify-center mt-10  lg:pr-10 px-5">
                <div>
                    <h1 className="lg:text-3xl font-bold ">
                        MANAGE YOUR <span className="text-4xl text-orange-400">DASHBOARD</span>
                    </h1>
                    <p>Permanent Love Bangladeshi Matrimony Ltd is the No.1 most trusted matrimony site for Bangladeshi brides and grooms. Lakhs of members have successfully found their life partners here! You can also find top quality profiles that belong to Muslim, Buddhist, Hindu, Christian and other communities.
                    </p>
                    
                </div>
                <div className="">
                    <Player className="w-full"
                        autoplay
                        loop
                        src="https://lottie.host/3fa5d14e-2e91-4be6-8849-5cd8033876f2/gfTiyd484j.json"
                        // style={{ height: "300px", width: "200px" }}
                    ></Player>
                </div>
              
            </div>
           
        </div>
    );
};

export default WelcomePage;