import React from "react";
import { useState } from "react";
import { format } from 'date-fns'

import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageList from "@material-ui/core/ImageList";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
//import Person from '@material-ui/core/Person'
//import ArrowForward from '@material-ui/core/ArrowForward'
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//import ArrowForward from '@material-ui/core/ArrowForward'
import ArrowForward from "@material-ui/icons/ArrowForward";
//import unicornbikeImg from "./../assets/images/unicornbikeImg.jpg";
import bookImg from './../assets/images/book.png';
import { list } from "../borrow/api-borrow.js";
import { update, remove } from "../borrow/api-borrow.js";
import auth from "../lib/auth-helper.js";

import { ReactSession }  from 'react-client-session';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  button: {
    borderRadius: 28,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Borrows() {
  const [borrows, setBorrows] = useState([]);
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });
  var userId = ReactSession.get("username");
  //if (userId == null){
  //    auth.simpleClearJWT();
  //    return <Navigate to={"/"} />;
  //}
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setBorrows(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const classes = useStyles();

  //const clickSubmit_return = () => {
  function clickSubmit_return(id) {
    alert(`Returned`);

    //return <Navigate to={"/usereeee"} />;
    const jwt = auth.isAuthenticated();
    //alert(`Returned`);
    remove(
      {
        borrowId: id,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
        return <Navigate to={"/myaccount"} />;
      }
    });
  };
  
  //if (values != null && values.redirectToProfile==true){
  //  values.redirectToProfile=false;
  //  return <Navigate to={"/myaccount"} />;
  //}

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Borrow
      </Typography>
      <ImageList sx={{ width: 500, height: 450 }} cols={1} rowHeight={200} >
        {borrows.map((item, i) => {
          if (item.user == userId){
          return (
            <div>
            <Link component={RouterLink} to={"/book/" + item.bookId} key={i}>
                <Box
                  component="img"
                  sx={{
                    height: 128,
                    width: 128,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt={item.title}
                  src={`${bookImg}?w=161&fit=crop&auto=format&dpr=2 2x`}
                />
                <ImageListItemBar title={item.title} subtitle={<span>Expiry date: {format(new Date(item.date), "dd-MMM-yyyy")}</span>} position="below" />
                
            </Link>
            <Button color="inherit" variant="contained" onClick={() => clickSubmit(item._id)} className={classes.button} startIcon={<AutorenewIcon />}>Renew</Button>
            &nbsp;&nbsp;&nbsp;<Button color="secondary" variant="contained" onClick={() => clickSubmit_return(item._id)} className={classes.button} startIcon={<ArrowDropDownCircleIcon />}>Return</Button>
            </div>
          );
          }
        })}
      </ImageList>
    </Paper>
  );

  function clickSubmit(id) {
  const jwt = auth.isAuthenticated();
  alert(`Renewed! Extended for an additional 28 days from today. Please refresh the web page.`);
  var startOfToday = new Date();
  var priorDate = new Date(new Date().setDate(startOfToday.getDate() + 28));
  priorDate.setHours(0,0,0,0);

  const borrow = {
    date: priorDate || undefined,
  };
  update(
    {
      borrowId: id,
    },
    { t: jwt.token },
    borrow
  ).then((data) => {
    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      setValues({ ...values, userId: data._id, redirectToProfile: true });
      
    }
  });
  if (values.redirectToProfile) {
    return <Navigate to={"/user/" + values.userId} />;
  }
}

}
