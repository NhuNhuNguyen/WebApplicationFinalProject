import React, { useState, useEffect } from "react"; // Add useEffect
import { useParams } from "react-router-dom";
import { read, update } from "../borrow/api-book.js"; // Change create to update
import auth from '../lib/auth-helper';

import {
    Button,
    TextField,
    Paper,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        margin: "auto",
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
    },
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle,
    },
}));

export default function UpdateItem() { // Change AddItem to UpdateItem
    const { bookId } = useParams();
    const classes = useStyles();
    const [state, setState] = useState({
        title: "",
        author: "",
        publisher: "",
        description: "",
        rating:0,
        publishDate: ""
    })
    const jwt = auth.isAuthenticated();
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false); 

    const handleChange = (name) => (event) => {
        if (name == "publishDate") {
            setState({ ...state, [name]: event.target.value });
        } else {
            setState({ ...state, [name]: event.target.value  });
        }
    };

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
                setState(data);
            }
          });
          return function cleanup() {
            abortController.abort();
          };
    }, [bookId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        const abortController = new AbortController();
        const signal = abortController.signal;
        update({bookId:bookId},{t: jwt.token}, state).then((data) => { // Change create to update
        if (data && data.error) {
            console.log(data.error);
        } else {
            console.log(data);
            setState(data);
            setMessage("Book updated successfully!"); // Change "added" to "updated"
            setIsSubmitted(true);
        }
        })
    }


    return (
        <Paper className={classes.root} elevation={4}>
            <form onSubmit={handleSubmit}>
                <TextField label="Book Title"
                    color="secondary"
                    onChange={handleChange("title")} value={state.title}/> <br /> <br />
                <TextField label="Author"
                    color="secondary"
                    onChange={handleChange("author")} value={state.author}/> <br /> <br />
                <TextField label="Publisher"
                    color="secondary"
                    onChange={handleChange("publisher")} value={state.publisher}/> <br /> <br />

                <TextField label="Description"
                    color="secondary"
                    onChange={handleChange("description")} value={state.description}/> <br /> <br />
                    
                    <TextField
                        label="Publish Date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange("publishDate")}
                        value={state.publishDate.split('T')[0]}
                    /><br /> <br />

                <Button variant="outlined" type="submit" disabled={isSubmitted}>Update</Button>
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>} {/* Add this line */}
        </Paper>
    )
}
