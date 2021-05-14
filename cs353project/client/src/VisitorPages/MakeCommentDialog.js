import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";

export default function FormDialog(props) {
    const [respond,setRespond] = React.useState("");

    const submit = () => {
        Axios.post("http://localhost:3001/api/makeComment", {
            comment: respond,
            eventID : props.eventID,
        }).then((response)=>{
            alert('success');
        });
        alert('success');
        props.onClose();
    }

    return (
        <div>
            <Dialog fullWidth open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="respond"
                        label="Comment"
                        type="text"
                        fullWidth
                        multiline
                        rows={20}
                        onChange={(e)=>{setRespond(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={submit} color="primary">
                        Send
                    </Button>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
