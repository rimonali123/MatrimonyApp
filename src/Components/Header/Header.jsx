
// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiLogInCircle } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from '../../Authentication/Provider/AuthProvider';
import { IoMdLogOut } from 'react-icons/io';
import Swal from 'sweetalert2';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hoock/useAxiosSecure';
// import AdbIcon from '@mui/icons-material/Adb';



const pages = [
    <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/' key={1}>Home</NavLink>,
    <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/bioData' key={2}>Biodatas</NavLink>,
    <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/aboutUs' key={3}>About Us</NavLink>,
    <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/contactUs' key={4}>Contact us</NavLink>,
    <NavLink to='/dashboard/' key={5}>Dashboard</NavLink>,
];
const pages1 = [
    <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/' key={6}>Home</NavLink>,
    <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/bioData' key={7}>Biodatas</NavLink>,
    <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/aboutUs' key={8}>About Us</NavLink>,
    <NavLink className={({ isActive }) => isActive ? 'border p-2 rounded-lg text-xl' : ''} to='/contactUs' key={9}>Contact us</NavLink>,
];


const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: userBiodata } = useQuery({
        queryKey: ['usersBiodata', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/usersBiodata/${user?.email}`);
            return res.data
        }

    })
    // console.log(userBiodata)
    // console.log(user.photoURL)


    const [anchorElNav, setAnchorElNav] = useState(null);
    // const [anchorElUser, setAnchorElUser] = useState(null);
    // console.log(anchorElUser)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };




    const handlelogout = () => {
        logout()
            .then(() => {
                console.log('LogOut Successfully')
                Swal.fire({
                    position: "center,top-end",
                    icon: "error",
                    title: "LogOut Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/login')
            })
            .catch(error => {
                console.error(error.message)
            })
        navigate('/')
    }
    return (
        <div>
            <AppBar position="fixed" className='max-h-28'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <img src="https://i.ibb.co/5nVCmD9/Logo-bg.png" alt="" className='w-32 hidden lg:flex' />


                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>

                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        <img src="https://i.ibb.co/5nVCmD9/Logo-bg.png" alt="" className='w-32 flex lg:hidden' />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {user ? pages.map((page, index) => (
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            )) : pages1.map((page, index) => (
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        {/* end section start here the box */}
                        {
                            user &&
                            <div>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title={userBiodata?.name}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src={userBiodata?.photoUrl} />
                                        </IconButton>
                                    </Tooltip>

                                </Box>
                            </div>
                        }
                        {user ?
                            <Link onClick={handlelogout} className='ml-4 ' to='/login' key='3'><Button variant="contained" color="success" className='flex gap-2'>
                                Log Out < IoMdLogOut />
                            </Button>
                            </Link> :
                            <Link className='ml-4' to='/login' key='3'><Button variant="contained" color="success" className='flex gap-2'>
                                Log In<BiLogInCircle />
                            </Button>
                            </Link>
                        }


                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;