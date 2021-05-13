import CageCard from "./CageCard";
import CoordinatorSideBar from "./CoordinatorSideBar";
import React, {useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Axios from "axios";



function CoordinatorCagePage() {
    const [checked, setChecked] = React.useState(false);
    const [cages,setCages] = React.useState([]);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/getAllCages", {
        }).then((response)=>{
            setCages(response.data);
        });
    });

/*
    useEffect(()=>{
        const firstReq = Axios.get("http://localhost:3001/api/listGuideTour");
        const secondReq =Axios.get("http://localhost:3001/api/listEducationalPrograms");

        Axios.all([firstReq,secondReq,thirdReq]).then((response)=>{
            setCages(response[0].data);
            setEdurow(response[1].data);
        });
    },[]);

 */

/*
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

 */
    return(
        <div>
            <CoordinatorSideBar title = "Cage Page"></CoordinatorSideBar>
            <div style = {{justifyContent: 'center'}}>
                <br/>
                <Grid style = {{justifyContent: 'center'}} container spacing = {10}>
                    {
                        cages.map((event , index) =>
                            {
                                    return (
                                        <Grid item xs={2}>
                                            <CageCard cageID = {event.cageID}
                                                      animal={event.animalType}
                                            />
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

export default CoordinatorCagePage;
