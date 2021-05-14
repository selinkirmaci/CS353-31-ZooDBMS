import React, {useEffect} from 'react';
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
import Axios from "axios";

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

export default function AnimalInformationPage(props) {
    const classes = useStyles();
    const[treatments,setTreatments] = React.useState([]);
    const[trainings,setTrainings] = React.useState([]);


    useEffect(()=>{
        const firstReq =   Axios.post("http://localhost:3001/api/getAnimalTreatments",{
            animalID: props.location.data[0].animalInfo.animalID,
        });

        const secondReq =  Axios.post("http://localhost:3001/api/getAnimalTrainings",{
            animalID: props.location.data[0].animalInfo.animalID,
        });

        Axios.all([firstReq,secondReq]).then((response)=>{
            setTreatments(response[0].data);
            setTrainings(response[1].data);
        },[]);
    })

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Card className={classes.card}>
                            <CardContent>
                                <br/>
                                <Typography gutterBottom variant="h5" component="h2">
                                   Animal Name : {props.location.data[0].animalInfo.name}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Animal Age : {props.location.data[0].animalInfo.age}
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
                            {trainings.map((training) => (
                                <Typography gutterBottom variant="h5" component="h2">
                                    Scheduled training with {training.name} {training.surname} in {(training.trainingDate).slice(0, 10)}
                                </Typography>
                            ))}
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
                            {treatments.map((treatment) => (
                                <Typography gutterBottom variant="h5" component="h2">
                                    Scheduled treatment with {treatment.name} {treatment.surname}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
