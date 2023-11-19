import React from 'react';
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
  const clickSubmit = () => {
    console.log("click...............")
  }
  const handleChange = name => event => {
    
    console.log("change..............");
    const book = {
      bookTitle: event.target.value || undefdined
    }
    alert('s1f');
    const abortController = new AbortController();
    const signal = abortController.signal;
    //list(signal).then((data) => {
    read2(book, signal).then((data) => {
      //alert('sss222d' +data)
      if (data.error) {
        alert('sss1' +data)
        setValues({ ...values, error: data.error })
      } else {
        console.log(data)
        alert('sss2' +data)
      }
    })
  }
  
  const classes = useStyles()
  return (
    <Card className={classes.card}>

      <Typography variant="h6" className={classes.title}>New Borrow</Typography>
      <TextField id="title" type="title" label="Title" className={classes.textField} onChange={handleChange('title')}  margin="normal" /><br />

      <CardMedia className={classes.media} />
      <CardContent>

        <Typography variant="body2" component="p">
          .
        </Typography>

      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Borrow Now</Button>
      </CardActions>
    </Card> 
  )
}