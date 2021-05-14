import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";
import KeeperSideBar from "./KeeperSideBar";
import EventCard from "../EventCard";
import {Grid} from "@material-ui/core";
import TrainingCard from "./TrainingCard";

export default function FormDialog(props) {
    const [trainings,setTrainings] = React.useState([]);

    useEffect(()=>{
        Axios.post("http://localhost:3001/api/displayTrainings", {
            keeperID:localStorage.getItem('userID'),
        }).then((response)=>{
            setTrainings(response.data)
        });
    });


    return (
        <div>
            <KeeperSideBar title="Trainings"></KeeperSideBar>
            <Grid container spacing = {3}>
                {
                    trainings.map((training) =>
                        {
                            return(
                                <Grid item xs = {3}>
                                    <TrainingCard animalName = {training.name} date = {training.trainingDate}></TrainingCard>
                                </Grid>
                            )
                        }
                    )
                }
            </Grid>
            <Grid item xs = {3}>
            </Grid>
        </div>
    );
}
