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

function RefundRequestPage() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [refunds, setRefunds] = React.useState([]);



    const cages = [
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bear', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'giraffe', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'lion', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'panda', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'snake', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bear', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'giraffe', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'lion', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'panda', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'snake', label: 'Edit Event', minWidth: 50 ,align: 'right'}
    ];

    const handleRespondClick = () => {
        setOpen(true);
    };

    const handleRespondClose = () => {
        setOpen(false);
    };

    const handleAccept = (eventID,userID) => {
        const firstReq =  Axios.put("http://localhost:3001/api/giveRefund",{
            userID:userID ,
            eventID: eventID,
        });
        const secondReq =  Axios.post("http://localhost:3001/api/acceptRefund",{
            userID:userID ,
            eventID: eventID,
        })

        Axios.all([firstReq,secondReq]).then((response)=>{
        },[]);
        window.location.reload();
    };
    const handleReject = (eventID,userID) => {
        const firstReq =  Axios.post("http://localhost:3001/api/rejectRefund",{
            userID:userID ,
            eventID: eventID,
        });

        Axios.all([firstReq]).then((response)=>{
        },[]);
        window.location.reload();

    };

    useEffect(()=>{
        const firstReq = Axios.get("http://localhost:3001/api/listRefundRequests");

        Axios.all([firstReq]).then((response)=>{
            setRefunds(response[0].data);
        });
    },[]);


    return(
        <div>
            <CoordinatorSideBar title = "Cage Page"></CoordinatorSideBar>
            <div style = {{justifyContent: 'center'}}>
                <br/>
                <Grid style = {{justifyContent: 'center'}} container spacing = {10}>
                    {
                        refunds.map((event , index) =>
                            {
                                return (
                                    <Grid item xs={2}>
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Refund tour name: {event.eventName}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        Money: {event.price} - Person: {event.name} {event.surname}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() =>handleAccept(event.eventID,event.userID)}>
                                                    Accept
                                                </Button>
                                                <Button size="small" color="primary"  onClick={() =>handleReject(event.eventID,event.userID)}>
                                                    Reject
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

export default RefundRequestPage;
