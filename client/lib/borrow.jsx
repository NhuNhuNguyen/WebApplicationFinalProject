import React from 'react';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { read2 } from "../borrow/api-book.js";

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

export default function Home() {

  const [books, setBorrows] = useState([]);
  
  const clickSubmit = () => {
    console.log("click...............")
    alert('clcik ' +title.value)
    const book = {
      bookTitle: title.value || undefdined
    }

    const abortController = new AbortController();
    const signal = abortController.signal;
    //list(signal).then((data) => {
    read2(bookTitle, signal).then((data) => {
      if (data.error) {
        alert('a');
        setValues({ ...values, error: data.error })
      } else {
        alert('b');
        console.log(data)
      }
    })
  }
  const handleChange = name => event => {
    console.log("change..............");
    
  }
  
  const classes = useStyles()
  return (
    <Card className={classes.card}>

      <Typography variant="h6" className={classes.title}>New Borrow</Typography>
      <TextField id="title" type="title" label="Title" className={classes.textField} onChange={handleChange('title')}  margin="normal" /><br />

      <CardMedia className={classes.media} />
      <CardContent>

        <Typography variant="body2" component="p">
        {books.map((item, i) => {
          return (
            item._id
          );
        })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Borrow Now</Button>
      </CardActions>
    </Card> 
  )
}