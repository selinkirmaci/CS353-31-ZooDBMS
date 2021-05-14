import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";
import {Grid} from "@material-ui/core";
import VeterinarianSidebar from "./VeterinarianSidebar";
import TreatmentCard from "./TreatmentCard";

export default function FormDialog(props) {
    const [treatments,setTreatments] = React.useState([]);

    useEffect(()=>{
        Axios.post("http://localhost:3001/api/displayTreatments", {
            vetID:localStorage.getItem('userID'),
        }).then((response)=>{
            setTreatments(response.data)
        });
    });


    return (
        <div>
            <VeterinarianSidebar title="Trainings"></VeterinarianSidebar>
            <Grid container spacing = {3}>
                {
                    treatments.map((treatment) =>
                        {
                            return(
                                <Grid item xs = {3}>
                                    <TreatmentCard animalName = {treatment.name}></TreatmentCard>
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
