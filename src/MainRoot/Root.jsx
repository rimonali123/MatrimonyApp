import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Authentication/LogIn/LogIn";
import Register from "../Authentication/LogIn/Register";
import BioData from "../Pages/BioData/BioData";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Dashboard from "../Pages/DashboardPage/Dashboard";
import AdminDashboard from "../Pages/DashboardPage/AdminPages/AdminDashboard";
import ManageUser from "../Pages/DashboardPage/AdminPages/ManageUser";
import ApprovedPremium from "../Pages/DashboardPage/AdminPages/ApprovedPremium";
import ApprovedContactRequest from "../Pages/DashboardPage/AdminPages/ApprovedContactRequest";
import EditBiodata from "../Pages/DashboardPage/NormarUserPages/EditBiodata";
import ViewBiodata from "../Pages/DashboardPage/NormarUserPages/ViewBiodata";
import FavoriteBiodata from "../Pages/DashboardPage/NormarUserPages/FavoriteBiodata";
import MyContactRequest from "../Pages/DashboardPage/NormarUserPages/MyContactRequest";
import PrivateRout from "./PrivateRout";
import AdminRoute from "./AdminRoute";
import SucessStoryTable from "../Components/AdminComponents/SucessStoryTable";
import GotMarried from "../Components/NormalUserComponent/GotMarried";
import ViewBiodataDetails from "../Pages/BioData/ViewBioData/ViewBiodataDetails";
import Payment from "../Pages/DashboardPage/Payment/Payment";
import WelcomePage from "../Pages/DashboardPage/WelcomePage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
           
            {
                path: '/bioData',
                element: <BioData></BioData>
            },
            {
                path: '/viewBiodataDetails/:id',
                element: <PrivateRout><ViewBiodataDetails></ViewBiodataDetails></PrivateRout>,
                loader: ({params}) =>fetch(`https://assignment-12-server-side-gray.vercel.app/userBiodata/${params.id}`)
            },
            {
                path: '/contactUs',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: "/login",
                element: <LogIn></LogIn>
            },
            {
                path: "/register",
                element: <Register></Register>
            },


        ]

    },
    {
        path: "/dashboard",
        element: <PrivateRout><Dashboard></Dashboard></PrivateRout>,
        children: [
            // normal user pages
            {
                index: true,
                element: <WelcomePage></WelcomePage>
            },
            {
                path: 'editBiodata',
                element: <EditBiodata></EditBiodata>
            },
            {
                path: 'viewBioData',
                element: <ViewBiodata></ViewBiodata>
            },
            {
                path: 'favoriteBioData',
                element: <FavoriteBiodata></FavoriteBiodata>
            },
            {
                path: 'payment',
                element: <PrivateRout><Payment></Payment></PrivateRout>
            },
            {
                path: 'myContactRequest',
                element: <MyContactRequest></MyContactRequest>
            },
            {
                path: 'gotMarried',
                element: <GotMarried></GotMarried>
            },

            // Admi pages
            {
                path: 'adminDashboard',
                element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
            },
            {
                path: 'manageUser',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: 'approvedPremium',
                element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>
            },
            {
                path: 'approvedContactRequest',
                element: <AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute>
            },

            {
                path:'successStory',
                element: <SucessStoryTable></SucessStoryTable>
            },
        ]
    }

]);