import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EventDetailModal from "./EventDetailModal";
import { PinDropSharp } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function ImgMediaCard(props) {
    const classes = useStyles();

    const [modalShow, setModalShow] = React.useState(false);
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={props.image}  // !! make modular 
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title} {props.eventID}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => setModalShow(true)}>
                    {props.down}
                </Button>
                <EventDetailModal
                    title = {props.title}
                    time = {props.time}
                    date = {props.date}
                    location = {props.location}
                    leftcap ={props.leftcap}
                    duration ={props.duration}
                    price = {props.price}
                    userId = {props.userId}
                    eventID = {props.eventID}
                    show={modalShow}
                    leftModalButton={props.leftModalButton}
                    rightModalButton={props.rightModalButton}
                    onHide={() => setModalShow(false)}
                />
            </CardActions>
        </Card>
    );
}
