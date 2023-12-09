import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';


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
  <AppBar position="static" style={{ background: '#225777', borderRadius: 28 }}>
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
      <Typography variant="h6" color="inherit" >
      Web Ninja's Library
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(location, "/")}>
          <HomeIcon/>Home
        </IconButton>
      </Link>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <IconButton aria-label="Home" style={isActive(location, "/signup")}>
              <PersonAddIcon/>Sign up
            </IconButton>
          </Link>
          
          <Link to="/signin">
            <IconButton aria-label="Home" style={isActive(location, "/signin")}>
              <VpnKeySharpIcon/>Sign In
            </IconButton>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
      <Link to="/users">
        <IconButton aria-label="Home" style={isActive(location, "/users")}>
          <GroupIcon/>Users
        </IconButton>
      </Link>
      <Link to="/listbooks">
        <IconButton aria-label="Home" style={isActive(location, "/listbooks")}>
          <PlaylistAddIcon/>New Borrow
        </IconButton>
      </Link>
      <Link to="/myaccount">
        <IconButton aria-label="Home" style={isActive(location, "/myaccount")}>
          <HistoryIcon/>My Borrow
        </IconButton>
      </Link>
      <Link to="/manageBooks">
        <IconButton aria-label="Home" style={isActive(location, "/manageBooks")}>
          <RecentActorsIcon/>Manage Books
        </IconButton>
      </Link>
      <IconButton aria-label="Home" style={isActive(location, "/signout")} onClick={() => {
               auth.clearJWT(() => navigate('/')); }}>
          <ExitToAppIcon/>Sign Out
      </IconButton>
        </span>)
      }
    </Toolbar>
  </AppBar>
);
};


