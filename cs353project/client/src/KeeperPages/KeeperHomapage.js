import React, {useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import KeeperCageCard from "./KeeperCageCard";
import KeeperSideBar from "./KeeperSideBar";
import Axios from "axios";



function KeeperHomepage(props) {
    const [checked, setChecked] = React.useState(false);
    const [keeperID, setKeeperID] = React.useState("");

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const [cages,setCages] = React.useState([]);

    useEffect(()=>{

        setKeeperID(localStorage.getItem('userID'));

        Axios.post("http://localhost:3001/api/getAssignedCages", {
            keeperID:localStorage.getItem('userID'),
        }).then((response)=>{
            setCages(response.data);
        });
    });

    const cages2 = [
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bear', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'giraffe', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'lion', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'panda', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'snake', label: 'Edit Event', minWidth: 50 ,align: 'right'}
    ];
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
        { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
    ];
    return(
        <div>
            <KeeperSideBar title = "Homepage"></KeeperSideBar>
            <div style = {{justifyContent: 'center'}}>
                <br/>
                <Grid style = {{justifyContent: 'center'}} container spacing = {10}>
                    {
                        cages.map((event , index) =>
                            {
                                return (
                                    <Grid item xs={2}>
                                        <KeeperCageCard cageID={event.cageID} keeperID = {localStorage.getItem('userID')} cageID = {event.cageID} animalName = {event.name} animal={event.animalType}
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

export default KeeperHomepage;
