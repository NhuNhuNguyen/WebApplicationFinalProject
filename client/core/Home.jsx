import React from "react";
import { useState } from "react";
import { format } from 'date-fns'

import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import ImageList from "@material-ui/core/ImageList";
import Typography from "@material-ui/core/Typography";

import bookImg from './../assets/images/book.png';
import weblogo from './../assets/images/logo.png';
import { list } from "../borrow/api-book.js";
import { create } from "../borrow/api-borrow.js";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
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
  root: {
    // Define your root styles here
  },
}));

function clickSubmit(id, name) {
  alert(`Borrowed!`);
  var startOfToday = new Date();
  var priorDate = new Date(new Date().setDate(startOfToday.getDate() + 28));
  priorDate.setHours(0,0,0,0);

  const borrow = {
    user: 'defaultuser' || undefined,
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
          <Card className={classes.card}>
    <Typography variant="h4" className={classes.title}>Welcome to Web Ninja's Library</Typography>
    </Card>
    <Typography variant="h4" className={classes.title}>Collections of books</Typography>
      <ImageList sx={{ width: 500, margin: "10px" }} variant="quilted" cols={3} rowHeight={320} >
        {books.map((item, i) => {
          return (
            <Link component={RouterLink} to={"/bookPub/" + item._id} key={i}>
                            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="200"
                  //image={`${bookImg}`}
                  image={`${item.coverImg}`}
                  sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {item.author}
                  </Typography>
                </CardContent>
              </Card>
                
                
            </Link>
          );
        })}
      </ImageList>
    </Paper>
  );
}
