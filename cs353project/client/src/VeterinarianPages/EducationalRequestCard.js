import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

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

export default function EducationalRequestCard(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const classes1 = useStyles();
    const classes2 = useStyles2();

    const handleAccept = () => {
        Axios.put("http://localhost:3001/api/acceptInvitation",{
            vetID:localStorage.getItem('userID'),
            eventID : props.eventID,
        });
        alert("Invitation Accepted");
    };

    const handleReject = () => {
        Axios.put("http://localhost:3001/api/rejectInvitation",{
            vetID:localStorage.getItem('userID'),
            eventID : props.eventID,

        });
        alert("Invitation Rejected");

    };

    return (
        <Card className={classes1.root}>
            <CardActionArea>
                <CardContent onClick={handleAccept}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Invitation for {props.eventName}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleAccept}>
                    Accept
                </Button>
                <Button size="small" color="primary" onClick={handleReject}>
                    Reject
                </Button>
            </CardActions>
        </Card>
    );
}
