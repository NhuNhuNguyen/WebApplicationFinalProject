import React from "react";
import { useState } from "react";
import { format } from 'date-fns'

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
import { remove } from "../borrow/api-borrow.js";
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
  media: {
    minHeight: 400,
  },
}));


function clickSubmit(id) {
  const jwt = auth.isAuthenticated();
  alert(`Returned`);
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
    }
  });
}

var userId = ReactSession.get("username");

export default function Borrows() {
  const [borrows, setBorrows] = useState([]);
  
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
  }, []);

  const classes = useStyles();
  
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
            <Button color="primary" variant="contained" onClick={() => clickSubmit(item._id)} className={classes.submit}>Return</Button>
            </div>
          );
          }
        })}
      </ImageList>
    </Paper>
  );
}
