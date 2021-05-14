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
import AnimalCard from "./AnimalCard";
import AssignKeeperDialog from "./AssignKeeperDialog";
import CardActionArea from "@material-ui/core/CardActionArea";
import Axios from "axios";

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
    const [cages,setCages]= React.useState([]);
    const [keepers,setKeepers]= React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes2 = useStyles2();
    const [open2, setOpen2] = React.useState(false);
    const [value, setValue] = React.useState('Dione');

    const handleClickListItem = () => {
        setOpen2(true);
    };

    const handleClose2 = (newValue) => {
        setOpen2(false);

        if (newValue) {
            setValue(newValue);
        }
    };
    /*

    useEffect(()=>{
        Axios.post("http://localhost:3001/api/getAnimalsOfCage", {
            cageID:props.cageID,
        }).then((response)=>{
            setCages(response.data);
        });
    });

     */
    useEffect(()=>{
        const firstReq = Axios.post("http://localhost:3001/api/getAnimalsOfCage", {
            cageID:props.cageID,
        });
        const secondReq =Axios.get("http://localhost:3001/api/getKeepers");

        Axios.all([firstReq,secondReq]).then((response)=>{
            setCages(response[0].data);
            setKeepers(response[1].data);
        });
    },[]);

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {(props.cageName).toString().toUpperCase()} CAGE
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClickListItem}>
                            ASSIGN KEEPER
                        </Button>
                        <AssignKeeperDialog
                            classes={{
                                paper: classes2.paper,
                            }}
                            id="ringtone-menu"
                            keepMounted
                            open={open2}
                            onClose={handleClose2}
                            value={value}
                            options = {keepers}
                            cageID = {props.cageID}
                        />
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
                                            <AnimalCard animal={event.name} animalInfo={event}
                                            />
                                        </Grid>
                                    )
                                }
                            )
                        }
                    </Grid>
                </div>
            </Dialog>
        </div>
    );
}
