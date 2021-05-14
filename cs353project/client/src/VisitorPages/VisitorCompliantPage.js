import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from "axios";
import TextField from '@material-ui/core/TextField';
import VisitorSideBar from "./VisitorSideBar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
    }
}));

export default function AnimalInformationPage(props) {
    const classes = useStyles();
    const [name,setName] = React.useState("");
    const [subject,setSubject] = React.useState("");
    const [message,setMessage] = React.useState("");

    const submit = () => {
        Axios.post("http://localhost:3001/api/sendComplaint", {
            name:name,
            subject:subject,
            message:message,
            userID:localStorage.getItem('userID'),
        }).then((response)=>{
            alert('success');
            window.location.reload();
        });
    }

    return (
        <div className={classes.root}>
            <VisitorSideBar title = "Complaint"></VisitorSideBar>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Card className={classes.card}>
                        <CardContent align='center'>
                            <h1 align='center'>Create a Complaint Form</h1>
                            <br/>
                            <TextField fullWidth align='center'  id="name" label="Your Name" variant="outlined" onChange={(e)=>{setName(e.target.value);}} />
                            <br/>
                            <br/>
                            <TextField fullWidth align='center'  id="subject" label="Subject" variant="outlined" onChange={(e)=>{setSubject(e.target.value);}} />
                            <br/>
                            <br/>
                            <TextField
                                id="message"
                                label="Complaint"
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                                onChange={(e)=>{setMessage(e.target.value);}}
                            />
                        </CardContent>
                        <CardActions align='center'>
                            <Button variant="contained" color="primary" size="large" onClick={submit}>Send</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
