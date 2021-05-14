import React, {useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Axios from "axios";
import VisitorSideBar from "../VisitorPages/VisitorSideBar";
import GiftShopCard from "./GiftShopCard";



function CoordinatorCagePage() {
    const [checked, setChecked] = React.useState(false);
    const [cages,setCages] = React.useState([]);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/displayGifts", {
        }).then((response)=>{
            setCages(response.data);
        });
    });

    return(
        <div>
            <VisitorSideBar title = "Gift Shop"></VisitorSideBar>
            <div style = {{justifyContent: 'center'}}>
                <br/>
                <Grid style = {{justifyContent: 'center'}} container spacing = {10}>
                    {
                        cages.map((event , index) =>
                            {
                                return (
                                    <Grid item xs={2}>
                                        <GiftShopCard name = {event.name}
                                                      price = {event.price}
                                                      stockAmount = {event.stockAmount}
                                                      sID = {event.souvenirID}
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
