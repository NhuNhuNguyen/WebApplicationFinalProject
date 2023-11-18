import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useLocation } from 'react-router-dom';


const isActive = (location, path) => {
  return location.pathname === path ? { color: '#ff4081' } : { color: '#ffffff' };
};
export default function Menu(){ 
  const navigate = useNavigate();
  const location = useLocation();

  return (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Library
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(location, "/")}>
          <HomeIcon/>
        </IconButton>
      </Link>
      <Link to="/myaccount">
        <Button style={isActive(location, "/myaccount")}>My Account</Button>
      </Link>
      <Link to="/borrow">
        <Button style={isActive(location, "/borrow")}>Borrow</Button>
      </Link>
      <Link to="/renew">
        <Button style={isActive(location, "/renew")}>Renew</Button>
      </Link>
      <Link to="/return">
        <Button style={isActive(location, "/return")}>Return</Button>
      </Link>
    </Toolbar>
  </AppBar>
);
};


