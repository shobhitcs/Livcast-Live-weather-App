import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Logoimg from '../Images/logo.png';

const Navbar = () => {
    const { logout } = useLogout();
    const user = useSelector((state) => state.users.user);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // console.log(user);
    const handleLogout = () => {
        logout();
        handleDrawerClose();
    };

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const appBarStyle = {
        flexGrow: 1,
        backgroundColor: '#353535',
    };

    const logoTextStyle = {
        textDecoration: 'none',
        color: 'white',
        fontFamily: 'Maven Pro, sans-serif',
        fontSize: '26px',
        marginLeft: '26px',
        flexGrow: 1,
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
        marginRight: '16px',
        marginLeft: '16px',
        fontFamily: 'Maven Pro, sans-serif',
        fontWeight: 'bold',
    };
    return (
        <>
            <AppBar position="fixed" style={appBarStyle}>
                <Toolbar>
                    {/* Replace the Menu button with a hamburger icon */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                        sx={{ marginRight: '16px' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={Logoimg} height={'35px'} alt="LOGO" />
                    <NavLink to='/' style={{textDecoration: 'none'}}>
                        <Typography variant="h6" style={logoTextStyle}>
                            skycast
                        </Typography>
                    </NavLink>
                    {/* {!user && (
                        <NavLink to="/login" style={linkStyle}>
                            <div className='nav-it'>
                                LOGIN
                            </div>
                        </NavLink>
                    )} */}
                </Toolbar>
            </AppBar>
            {/* Drawer */}
            <Drawer anchor="bottom" open={isDrawerOpen} onClose={handleDrawerClose} >
                <List sx={{ backgroundColor: '#FFFFFF' }} >
                    {!user && (<><NavLink to="/" style={linkStyle}>
                        <ListItem onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </NavLink>
                        <NavLink to="/login" style={linkStyle}>
                            <ListItem onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <LockOpenIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sign In" />
                            </ListItem>
                        </NavLink></>)}
                    {user && (<><NavLink to="/" style={linkStyle}>
                        <ListItem onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </NavLink>
                        <NavLink to="/login" style={linkStyle}>
                            <ListItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </NavLink></>)}
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
