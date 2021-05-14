import CageCard from "./CageCard";
import CoordinatorSideBar from "./CoordinatorSideBar";
import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';

import {Grid, Paper} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RespondComplaintDialog from "./RespondComplaintDialog";
import Axios from "axios";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function ComplaintDisplay() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [forms,setForms] = React.useState([]);
    const [writer,setWriter] = React.useState("");
    const [formID,setFormID] = React.useState("");


    useEffect(()=>{
        const firstReq =   Axios.get("http://localhost:3001/api/getComplaints");

        Axios.all([firstReq]).then((response)=>{
            setForms(response[0].data);
        },[]);
    });

    const handleRespondClick = () => {
        setOpen(true);
    };

    const handleRespondClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <CoordinatorSideBar title = "Display Complaint Forms"></CoordinatorSideBar>
            <RespondComplaintDialog formID = {formID} writer = {writer} open = {open} onClose={ handleRespondClose }></RespondComplaintDialog>
            <div style = {{justifyContent: 'center'}}>
                <br/>
                <Grid style = {{justifyContent: 'center'}} container spacing = {10}>
                    {
                        forms.map((event , index) =>
                            {
                                return (
                                    <Grid item xs={2}>
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Complaint Topic: {event.subject}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        Complaint Paragraf: {event.message}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={()=>{
                                                    setWriter(event.name);
                                                    setFormID(event.formID);
                                                    setOpen(true);
                                                }}>
                                                    Respond
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            }
                        )
                    }
                </Grid>
            </div>
        </div>
    );
}

export default ComplaintDisplay;
