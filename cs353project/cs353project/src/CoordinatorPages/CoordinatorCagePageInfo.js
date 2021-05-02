import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
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

    const cages = [
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { animalName: 'bird', label: 'Edit Event', minWidth: 50 ,align: 'right'},

    ];

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
                        <Button autoFocus color="inherit" onClick={props.handleClose}>
                            ASSIGN KEEPER
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
                                            <AnimalCard animal={event.animalName}
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
