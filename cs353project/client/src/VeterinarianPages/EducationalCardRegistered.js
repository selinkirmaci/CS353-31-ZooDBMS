import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <Typography align = 'center' className={classes.title}  gutterBottom>
                    Event Name: {props.eventName}
            </Typography>
            <CardContent>
                <Typography align = 'center' className={classes.title}  gutterBottom>
                    Topic: {props.topic}
                </Typography>
                <Typography align = 'center' className={classes.title}  gutterBottom>
                    Speaker: {props.speaker}
                </Typography>
                <Typography align = 'center' className={classes.title}  gutterBottom>
                    Date: {props.date}
                </Typography>
                <Typography align = 'center' className={classes.title}  gutterBottom>
                    Time: {props.time}
                </Typography>
                <Typography align = 'center' className={classes.title}  gutterBottom>
                    Duration: {props.duration}
                </Typography>
                <Typography align = 'center' className={classes.title}  gutterBottom>
                    Location: {props.location}
                </Typography>
            </CardContent>
        </Card>
    );
}
