import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/AllHomeComponents/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className="max-w-6xl mx-auto">
                
                <Outlet></Outlet>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;