import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Box from "@material-ui/core/Box";
import weblogo_s from './../assets/images/logo_s.png';
import auth from '../lib/auth-helper';

const isActive = (location, path) => {
  return location.pathname === path ? { color: '#ff4081' } : { color: '#ffffff' };
};
export default function Menu(){ 
  const navigate = useNavigate();
  const location = useLocation();

  return (
  <AppBar position="static">
    <Toolbar>
    <Box
      component="img"
      sx={{
        height: 40,
        width: 40,
        maxHeight: { xs: 40, md: 40 },
        maxWidth: { xs: 40, md: 40 },
      }}
      alt="Web Ninja's Library."
      src={`${weblogo_s}?w=40&fit=crop&auto=format&dpr=2 2x`}
      />
      <Typography variant="h6" color="inherit">
      Web Ninja's Library
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(location, "/")}>
          <HomeIcon/>
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(location, "/users")}>Users</Button>
      </Link>
      <Link to="/signup">
            <Button style={isActive(location, "/signup")}>Sign up
            </Button>
      </Link>
      <Link to="/listbooks">
        <Button style={isActive(location, "/listbooks")}>Borrow</Button>
      </Link>
      <Link to="/myaccount">
        <Button style={isActive(location, "/myaccount")}>My Account</Button>
      </Link>
      {/* <Link to="/borrow">
        <Button style={isActive(location, "/borrow")}>Borrow</Button>
      </Link> */}
      <Link to="/renew">
        <Button style={isActive(location, "/renew")}>Renew</Button>
      </Link>
      <Link to="/return">
        <Button style={isActive(location, "/return")}>Return</Button>
      </Link>
          <Link to="/signin">
            <Button style={isActive(location, "/signin")}>Sign In
            </Button>
          </Link>
    </Toolbar>
  </AppBar>
);
};


