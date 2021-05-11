import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VeterinarianListDialog from "../KeeperPages/VeterinarianListDialog";
import ScheduleTrainingDialog from "../KeeperPages/ScheduleTrainingDialog";
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

export default function TreatmentRequestCard(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const classes1 = useStyles();
    const classes2 = useStyles2();

    const [value, setValue] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);


    const handleInfoPage = () => {
        let a = "animalid";
        window.location.href="/coordinatoranimalinfo?"+a;
    };
    const handleTreatment = () => {
        setOpen(true);
    };

    const handleTreatmentClose = () => {
        setOpen(false);
    };

    const handleScheduleOpen = () => {
        setOpen2(true);
    };

    const handleScheduleClose = () => {
        setOpen2(false);
    };



    return (
        <Card className={classes1.root}>
            <CardActionArea>
                <CardContent onClick={handleInfoPage}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Title
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleTreatment}>
                    Schedule
                </Button>
                <Button size="small" color="primary" onClick={handleScheduleOpen}>
                    Reject
                </Button>
            </CardActions>
            <VeterinarianListDialog
                classes={{
                    paper: classes2.paper,
                }}
                id="ringtone-menu"
                keepMounted
                open={open}
                onClose={handleTreatmentClose}
                value={value}
            />
            <ScheduleTrainingDialog open = {open2} handleClose={handleScheduleClose}>
            </ScheduleTrainingDialog>
        </Card>
    );
}
