import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import weblogo from './../assets/images/logo.png';

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