import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";


const Navbar = () => {
    const { logout } = useLogout();
    const user = useSelector((state) => {
        return state.users.user;
    })
    

    const handleLogout = () => {
        logout();
    }
 
    const appBarStyle = {
        flexGrow: 1,
        backgroundColor: '#303030',
    };

    const logoTextStyle = {
        textDecoration: 'none',
        color: 'inherit',
        fontFamily: 'Maven Pro, sans-serif',
        fontSize: '26px',
        // fontWeight: 'bold',
        marginLeft: '26px',
        flexGrow: 1
    };
    
    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
        marginRight: '16px',
        marginLeft: '16px',
        fontFamily: 'Maven Pro, sans-serif',
        
    };
    const logoutButtonStyle = {
        color: 'black',
        marginRight: '16px',
        backgroundColor: '#FFFFFF',
    };

    return (
        <AppBar position="fixed" style={appBarStyle}>
            <Toolbar>
                <Typography variant="h6" style={logoTextStyle}>
                    ATTENDE
                </Typography>
                {!user && <NavLink to="/" style={linkStyle}>
                    <div className='nav-it'>
                        HOME
                    </div>
                </NavLink>}
                {!user && <NavLink to="/login" style={linkStyle}>
                    <div className='nav-it'>
                        LOGIN
                    </div>
                </NavLink>}
                {user &&
                    <Button color="inherit" style={logoutButtonStyle} onClick={handleLogout}>
                        Logout
                    </Button>}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
