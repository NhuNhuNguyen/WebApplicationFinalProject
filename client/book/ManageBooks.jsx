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

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import ArrowForward from "@material-ui/icons/ArrowForward";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PostAddIcon from '@material-ui/icons/PostAdd';
//import unicornbikeImg from "./../assets/images/unicornbikeImg.jpg";
import bookImg from './../assets/images/book.png';
import { list } from "../borrow/api-book.js";
import { create } from "../borrow/api-borrow.js";

import auth from '../lib/auth-helper';
import { ReactSession }  from 'react-client-session';

const useStyles = makeStyles((theme) => ({
  card: {
    // Define your card styles here
  },
  textField: {
    // Define your text field styles here
  },
  error: {
    // Define your error icon styles here
  },
  submit: {
    // Define your submit button styles here
  },
  button: {
    borderRadius: 28,
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  root: {
    // Define your root styles here
  },
}));

function clickSubmit(id, name) {
  var userId = ReactSession.get("username");
  alert(`Borrowed!`);
  var startOfToday = new Date();
  var priorDate = new Date(new Date().setDate(startOfToday.getDate() + 28));
  priorDate.setHours(0,0,0,0);

  const borrow = {
    user: userId || undefined,
    bookId: id || undefined,
    date: priorDate || undefined,
    renew: 0 || undefined,
    title: name || undefined,
  };
  create(
    borrow
  ).then((data) => {
    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      setValues({ ...values, userId: data._id, redirectToProfile: true });
    }
  });
}

export default function Lists() {
  const [books, setLists] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setLists(data);
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
        Manage Books &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link component={RouterLink} to="/addBook"><Button variant="contained" color="primary" className={classes.button} startIcon={<PostAddIcon />}>Add New Book</Button></Link>
      </Typography>
      
      <ImageList sx={{ width: 500, height: 450 }} cols={1} rowHeight={200} >
        {books.map((item, i) => {
          return (
            <div>
            <Link component={RouterLink} to={"/book/" + item._id} key={i}>
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
                <ImageListItemBar title={item.title} subtitle={<span>Author: {item.author}</span>} position="below" />
                
            </Link>
            
            {
            auth.isAuthenticated() && (
            <><Link component={RouterLink} to={"/updateBook/" + item._id} key={i}><Button variant="contained" color="default" className={classes.button} startIcon={<EditIcon />} > Modify </Button></Link>&nbsp;&nbsp;&nbsp;<Link component={RouterLink} to={"/deletebook/" + item._id} key={i}>
            <Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon />}>
            Delete
            </Button></Link></>)
            }
            </div>
          );
        })}
      </ImageList>
    </Paper>
  );
}
