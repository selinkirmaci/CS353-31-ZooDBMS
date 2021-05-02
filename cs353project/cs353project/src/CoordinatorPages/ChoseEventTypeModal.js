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
import AddNewEventDialog from "./AddNewEventDialog";

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

export default function ChoseEventTypeModal(props) {
    const classes = useStyles();

    const [age, setAge] = React.useState('');
    const [type, setType] =  React.useState('');
    const [addEventOpen, setAddEventClose] = React.useState(0);

    const handleAddEventOpen = () => {
        setAddEventClose(true);
    };
    const handleAddEventClose = () => {
        setAddEventClose(false);
        props.handleClose();

    };


    const handleChange = (event) => {
        setAge(Number(event.target.value) || '');
        setType(Number(event.target.value) || '');
    };
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new event</DialogTitle>
                <DialogContent>          <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="demo-dialog-native">Event Type</InputLabel>
                        <Select
                            native
                            value={age}
                            onChange={handleChange}
                            input={<Input id="demo-dialog-native" />}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>Group Tour</option>
                            <option value={2}>Educational Program</option>
                            <option value={3}>Conservational Organization</option>
                        </Select>
                    </FormControl>
                </form>
                    <AddNewEventDialog open = {addEventOpen}
                                       handleClose = {handleAddEventClose}
                                       tourType = {type}
                    ></AddNewEventDialog>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddEventOpen} color="primary">
                        Continue
                    </Button>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
