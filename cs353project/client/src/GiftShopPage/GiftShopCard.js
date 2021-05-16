import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PinDropSharp } from '@material-ui/icons';
import Axios from "axios";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function ImgMediaCard(props) {
    const classes = useStyles();
    const [money,setMoney] = React.useState([]);

    React.useEffect(()=>{
        const secondReq = Axios.post("http://localhost:3001/api/getUserMoney", {
            userID: localStorage.getItem('userID'),
        });
        Axios.all([secondReq]).then((response)=>{
            setMoney(response[0].data[0]);
        });
    },[]);


    const submit = () => {
        if(money.amountOfMoney >= props.price) {

            const secondReq = Axios.put("http://localhost:3001/api/updateUserMoney", {
                userID: localStorage.getItem('userID'),
                price: props.price,
            });

            const firstReq = Axios.post("http://localhost:3001/api/buySouvenir", {
                sID: props.sID,
            });

            Axios.all([secondReq, firstReq]).then((response) => {
                alert('success');
            }, []);
            alert('successful buy');
            window.location.reload();
        }
        else
        {
            alert('Your money is not enough');
        }
    };
    var imageURL = '/images/' + props.name + '.jpg';

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={imageURL}  // !! make modular
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name} Toy
                    </Typography>
                    <Typography gutterBottom variant="h7" component="h5">
                        Price: {props.price} $
                    </Typography>
                    <Typography gutterBottom variant="h7" component="h5">
                        Left Amount: {props.stockAmount}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={submit}>
                    BUY
                </Button>
            </CardActions>
        </Card>
    );
}
