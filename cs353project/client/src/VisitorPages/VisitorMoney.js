import {Button} from "primereact/button";
import {Paper} from "@material-ui/core";
import {Card} from "@material-ui/core";
import {InputText} from "primereact/inputtext";
import React from "react";
import {Link} from "react-router-dom";
import VisitorSideBar from "./VisitorSideBar";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Axios from "axios";
import {makeStyles} from "@material-ui/core/styles";

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

export default function VisitorMoney()
{
    const classes = useStyles();

    const [money,setMoney] = React.useState("");
    const [cardowner,setCardowner]= React.useState("");
    const [cvc,setCVC] = React.useState("");
    const [expriation,setExpriation]= React.useState("");

    const submit = () => {
        Axios.put("http://localhost:3001/api/uploadMoney", {
            userID:localStorage.getItem('userID'),
            price:money,
        });
        alert('success');
        window.location.href="/visitorhomepage";
    }
    const cancel = () => {
            window.location.href="/visitorhomepage";
    }


    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Card className={classes.card}>
                        <CardContent align='center'>
                            <h1 align='center'>Upload Money</h1>
                            <br/>
                            <TextField fullWidth align='center'  id="name" label="Amount of Money" variant="outlined" onChange={(e)=>{setMoney(e.target.value);}} />
                            <br/>
                            <br/>
                            <TextField fullWidth align='center'  id="subject" label="Card Owner" variant="outlined" onChange={(e)=>{setCardowner(e.target.value);}} />
                            <br/>
                            <br/>
                            <TextField fullWidth align='center'  id="subject" label="CVC" variant="outlined" onChange={(e)=>{setCVC(e.target.value);}} />
                            <br/>
                            <br/>
                            <TextField fullWidth align='center'  id="subject" label="Expiration Date" variant="outlined" onChange={(e)=>{setExpriation(e.target.value);}} />
                            <br/>
                            <br/>
                        </CardContent>
                        <CardActions align='center'>
                            <Button variant="contained" color="primary" size="large" onClick={submit}>Continue</Button>
                            <Button variant="contained" color="primary" size="large" onClick={cancel}>Cancel</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}