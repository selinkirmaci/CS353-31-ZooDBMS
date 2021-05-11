import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
    }
}));

export default function AnimalInformationPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Card className={classes.card}>
                            <CardContent>
                                <br/>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Animal Name
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Animal Age
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Animal Keeper Name
                                </Typography>
                            </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <br/>
                            <Typography gutterBottom variant="h5" component="h2">
                                Scheduled Trainings of the Animal
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                17/02/2021 with jennifer
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                18/02/2021 with jennifer
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <br/>
                            <Typography gutterBottom variant="h5" component="h2">
                                Scheduled Treatments of the Animal
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                17/02/2021 with Dr. George
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                18/02/2021 with Dr. Lana
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
