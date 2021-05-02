import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CoordinatorCagePageInfo from "./CoordinatorCagePageInfo";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function CageCard(props) {
    const classes = useStyles();
    const [modalShow, setModalShow] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInfoPage = () => {
        setOpen(true);
    };

    var imageURL = '/images/' + props.animal + '.jpg';

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    width="140"
                    image={imageURL}
                    title="Animal"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {(props.animal).toString().toUpperCase()} CAGE
                    </Typography>
                    <CoordinatorCagePageInfo open = {open} handleClose = {handleClose} cageName = {props.animal}></CoordinatorCagePageInfo>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleInfoPage}>
                    More
                </Button>
            </CardActions>
        </Card>
    );
}
