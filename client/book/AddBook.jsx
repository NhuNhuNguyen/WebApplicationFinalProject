import {
    Button,
    TextField,
    Paper,
    makeStyles
} from "@material-ui/core";

import React, { useState } from "react";
import { create } from "../borrow/api-book.js";

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

export default function AddItem() {
    const classes = useStyles();
    const [state, setState] = useState({
        title: "",
        author: "",
        publisher: "",
        description: "",
        rating:0,
        publishDate: ""
    })
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        const abortController = new AbortController();
        const signal = abortController.signal;
        create(state).then((data) => {
        if (data && data.error) {
            console.log(data.error);
        } else {
            console.log(data);
            setState(data);
            setMessage("Book added successfully!"); // Add this line
            setIsSubmitted(true);
        }
        })
    }

    const handleChange = (name) => (event) => {
        if (name == "publishDate") {
            setState({ ...state, [name]: event.target.value +" 00:00" });
        } else {
            setState({ ...state, [name]: event.target.value  });
        }
    };

    return (
        <Paper className={classes.root} elevation={4}>
            <form onSubmit={handleSubmit}>
                <TextField label="Book Title"
                    color="secondary"
                    onChange={handleChange("title")} /> <br /> <br />
                <TextField label="Author"
                    color="secondary"
                    onChange={handleChange("author")} /> <br /> <br />
                <TextField label="Publisher"
                    color="secondary"
                    onChange={handleChange("publisher")} /> <br /> <br />

                <TextField label="Description"
                    color="secondary"
                    onChange={handleChange("description")} /> <br /> <br />
                    
                    <TextField
                        label="Publish Date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange("publishDate")}
                    /><br /> <br />

                <Button variant="outlined" type="submit" disabled={isSubmitted}>Save</Button>
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>} {/* Add this line */}
        </Paper>
    )
}