import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import weblogo from './../assets/images/logo.png';

import { useState } from "react";
import { format } from 'date-fns'

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
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
//import ArrowForward from '@material-ui/core/ArrowForward'
import ArrowForward from "@material-ui/icons/ArrowForward";
//import unicornbikeImg from "./../assets/images/unicornbikeImg.jpg";
import bookImg from './../assets/images/book.png';
import { list } from "../borrow/api-book.js";

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


export default function Home(){ 
const classes = useStyles()
return (
<Card className={classes.card}>
   
  <Typography variant="h6" className={classes.title}>Welcome to Web Ninja's Library</Typography>
  <Box
  component="img"
  sx={{
    height: 260,
    width: 260,
    maxHeight: { xs: 260, md: 260 },
    maxWidth: { xs: 260, md: 260 },
  }}
  alt="Web Ninja's Library."
  src={`${weblogo}?w=260&fit=crop&auto=format&dpr=2 2x`}
  />

<CardMedia className={classes.media}/>
<CardContent>
<Typography variant="body2" component="p"> 
.
</Typography>
</CardContent>
</Card> 
)
}