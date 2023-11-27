import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../lib/auth-helper.js";
import { read } from "../borrow/api-book.js";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ReactSession }  from 'react-client-session';
import bookImg from './../assets/images/book.png';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function BookDetail({ match }) {
  const classes = useStyles();
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const jwt = auth.isAuthenticated();

  var username = ReactSession.get("username");
  //if (username ==null){
  //  alert(' Needed login')
  //}
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        bookId: bookId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setBook(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [bookId]);

  return (
    <Paper className={classes.root} elevation={4}>
    <Typography variant="h6" className={classes.title}>
      Book - {book.title}
    </Typography>
    <List dense>
      <ListItem>
        <ListItemAvatar>
          <Box
            component="img"
            sx={{
              height: 128,
              width: 128,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt={book.title}
            src={`${bookImg}?w=161&fit=crop&auto=format&dpr=2 2x`}
          />
        </ListItemAvatar>
        <ListItemText primary={'Author: ' +book.author} secondary={'Publisher: ' +book.publisher} />
        
        
      </ListItem>
      <ListItem><ListItemText primary={'Description: ' +book.description} /></ListItem>
      <ListItem><ListItemText primary={'Rating: ' +book.rating +' /5.0'} /></ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary={"Publish Date: " + new Date(book.publishDate).toDateString()}
        />
      </ListItem>
    </List>
  </Paper>
  )
}
