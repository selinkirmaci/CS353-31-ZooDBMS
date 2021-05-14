import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Grid} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import KeeperAnimalCard from "./KeeperAnimalCard";
import AssignKeeperDialog from "../CoordinatorPages/AssignKeeperDialog";
import VeterinarianListDialog from "./VeterinarianListDialog";
import Axios from "axios";
import KeeperCageCard from "./KeeperCageCard";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const useStyles2 = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CoordinatorCagePageInfo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes2 = useStyles2();
    const [open2, setOpen2] = React.useState(false);
    const [value, setValue] = React.useState('Dione');
    const [cages,setCages] = React.useState([]);
    const [foodAmount,setFoodAmount] = React.useState([]);


    const handleClickListItem = () => {
        Axios.post("http://localhost:3001/api/regularizeFood", {
            cageID:props.cageID,
        }).then((response)=>{
        });
        window.location.reload();
    };

    const handleClose2 = (newValue) => {
        setOpen2(false);

        if (newValue) {
            setValue(newValue);
        }
    };
    useEffect(()=>{
        const firstReq = Axios.post("http://localhost:3001/api/getAnimalsOfCage", {
            cageID:props.cageID,
        });

        const secondReq =Axios.post("http://localhost:3001/api/getFoodAmount", {
            cageID:props.cageID,
        });

        Axios.all([firstReq,secondReq]).then((response)=>{
            setCages(response[0].data);
            setFoodAmount(response[1].data[0]);
        });
    },[]);




    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar title = {foodAmount.foodAmount} className={classes.appBar}>
                    <Toolbar>

                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.cageName} CAGE
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClickListItem}>
                            Regularize Food
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style = {{justifyContent: 'center'}}>
                    <br/>
                    <Grid style = {{justifyContent: 'center'}} container spacing = {10}>
                        {
                            cages.map((event , index) =>
                                {
                                    return (
                                        <Grid item xs={2}>
                                            <KeeperAnimalCard animalID = {event.animalID} keeperID = {localStorage.getItem('userID')} animalType={event.species} animal={event.name}
                                            />
                                        </Grid>
                                    )
                                }
                            )
                        }
                    </Grid>
                    <Typography align = 'center' variant="h3" className={classes.title}>
                        Food Amout : {foodAmount.foodAmount}
                    </Typography>
                </div>
            </Dialog>
        </div>
    );
}
