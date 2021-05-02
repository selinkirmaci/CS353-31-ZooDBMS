import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HomeIcon from "@material-ui/icons/Home";
import PetsIcon from "@material-ui/icons/Pets";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function AddNewEventDialog(props) {
    const classes = useStyles();

    const [age, setAge] = React.useState('');

    const [disabled, setDisabled] = React.useState(false);

    var groupTourFields = [
        {id:"eventName", label: "Event Name", type:"text"},
        {id:"capacity", label: "Capacity",type:"text"},
        {id:"date", label: "Date", type:"text"},
        {id:"time", label: "Time", type:"text"},
        {id:"location", label: "Location", type:"text"},
        {id:"duration", label: "Duration", type:"text"},
        {id:"price", label: "Price", type:"text"},
        {id:"tourGuide", label: "Tour Guide Name",type:"text"},
    ]

    var educationalProgramFields = [
        {id:"eventName", label: "Event Name", type:"text"},
        {id:"capacity", label: "Capacity",type:"text"},
        {id:"date", label: "Date", type:"text"},
        {id:"time", label: "Time", type:"text"},
        {id:"location", label: "Location", type:"text"},
        {id:"duration", label: "Duration", type:"text"},
        {id:"speaker", label: "Speaker Name", type:"text"},
        {id:"topic", label: "Topic",type:"text"},
    ];

    var conservationalOrganizationFields = [
        {id:"eventName", label: "Event Name", type:"text"},
        {id:"capacity", label: "Capacity",type:"text"},
        {id:"date", label: "Date", type:"text"},
        {id:"time", label: "Time", type:"text"},
        {id:"location", label: "Location", type:"text"},
        {id:"duration", label: "Duration", type:"text"},
        {id:"goalMoney", label: "Goal Money", type:"text"},
    ];

    const handleChange = (event) => {
        setAge(Number(event.target.value) || '');

    };

    function getTextFields (id,label,type)
    {
        return(
            <TextField
                autoFocus
                margin="dense"
                id={id}
                label={label}
                type={type}
                fullWidth
            />
        );
    }


    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new event</DialogTitle>
                <DialogContent>
                    {
                            props.tourType === 1 ? groupTourFields.map(field => getTextFields(field.id,field.label,field.type)) :
                            props.tourType === 2 ? educationalProgramFields.map(field => getTextFields(field.id,field.label,field.type)) :
                                conservationalOrganizationFields.map(field => getTextFields(field.id,field.label,field.type))
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Add Event
                    </Button>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
