import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AssignKeeperDialog from "./AssignKeeperDialog";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function AnimalCard(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const classes1 = useStyles();


    const handleInfoPage = () => {

    };

    var imageURL = '/images/' + props.animal + '.jpg';

    return (
        <Card className={classes1.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    width="140"
                    image={imageURL}
                    title="Animal"
                />
                <CardContent onClick={handleInfoPage}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {(props.animal).toString().toUpperCase()}
                    </Typography>
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
