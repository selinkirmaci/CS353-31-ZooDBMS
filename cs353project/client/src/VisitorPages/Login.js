import {Paper, Checkbox, FormControlLabel} from "@material-ui/core";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import fs from 'fs';

export default function Login()
{
    // taken from the site
    const [username,setUsername] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [userID,setUserID] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        submit();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const submit = () => {
        Axios.post("http://localhost:3001/api/login", {
            username:username,
            password:password,
        }).then((response)=>{
            console.log(response.data);
            setUserID(response.data);
            localStorage.setItem('userID',response.data);

            alert('success');
        });
        console.log(userID);
    }
    const [state, setState] = React.useState({
        admin : false,
        visitor : false,
        keeper : false,
        veterinarian  : false,
        link : "",
    });
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        
        if( event.target.name == "visitor"){
            setState({ link : "/visitorhomepage"});
        }else if( event.target.name == "keeper"){
            setState({ link : "/keeperhomepage"});
        }else if( event.target.name == "veterinarian"){
            setState({ link : "/veterinarianhomepage"});
        }else if( event.target.name == "coordinator"){
            setState({ link : "/coordinatorhomepage"});
        }
    };

    const { admin, visitor, keeper, veterinarian, link } = state;

    return (
        <div class = "row no-gutters" >
            <div class = "col no-gutters" style={{ height : '100vh', width : '50%' ,backgroundColor: 'white'}}>
                <Paper style={{backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)' , height : '100vh', width : '50%' }}></Paper>
            </div>
            <div className="col no-gutters"  style={{ height : '100vh', width : '100%' }}>
                <Paper elevation={0} style={{ height : '100vh', width : '100%' }}>
                    <Paper elevation={0} style={{
                        position: 'absolute', left: '60%', top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '70%',
                        minHeight: '50%',
                        maxHeight: '60%',
                        justifyContent: "center"
                    }}>
                        <h3  class = "text" style={{marginLeft:'40%'}}>WELCOME</h3>
                        <br/>
                        <br/>
                        <div className="p-fluid">
                            <div className="p-field p-grid">
                                <label  htmlFor="firstname4" className="p-col-12 p-md-2">Username</label>
                                <div className="p-col-12 p-md-10">
                                    <InputText style={{color: '#8C4FB7'}} id="firstname4" type="text"  onChange={(e)=>{setUsername(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="lastname4" className="p-col-12 p-md-2">Password</label>
                                <div className="p-col-12 p-md-10">
                                    <InputText type="password"  id="lastname4"  onChange={(e)=>{setPassword(e.target.value);}}/>
                                </div>
                                <FormControlLabel
                                    style={{marginTop : "2em"}}
                                    control={<Checkbox checked={admin} onChange={handleChange} name="coordinator" />}
                                    label="Is Coordinator"
                                    labelPlacement="left"
                                />
                                <FormControlLabel
                                    style={{marginTop : "2em"}}
                                    control={<Checkbox checked={visitor} onChange={handleChange} name="visitor" />}
                                    label="Is Visitor"
                                    labelPlacement="left"
                                />
                                <FormControlLabel
                                    style={{marginTop : "2em"}}
                                    control={<Checkbox checked={veterinarian} onChange={handleChange} name="veterinarian" />}
                                    label="Is Veterinarian"
                                    labelPlacement="left"
                                />
                                <FormControlLabel
                                    style={{marginTop : "2em"}}
                                    control={<Checkbox checked={keeper} onChange={handleChange} name="keeper" />}
                                    label="Is Keeper"
                                    labelPlacement="left"
                                />
                                {/* <text style={{marginLeft: '70%',textDecorationLine: 'underline'}}>Forgot password?</text> */}
                            </div>
                        </div>
                        <Button style={{color: 'white',backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)' , width : '30%',left: '41%'}} label="Try" className="p-button-rounded " onClick={handleClickOpen} />


                             <Button style={{color: 'white',backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)' , width : '30%',left: '41%'}} label="Sign In" className="p-button-rounded " />
                        <div>
                            <br/>
                            <Link to="/signup">
                                 <li style={{listStyle: 'none',marginLeft: '35%', textDecorationLine: 'underline',color: '#8C4FB7'}}>Don't have an account yet?</li>
                            </Link>
                        </div>
                        <div>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Let Google help apps determine location. This means sending anonymous location data to
                                        Google, even when no apps are running.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Disagree
                                    </Button>
                                    <Link to={{
                                        pathname: link,
                                        data: [{userID:userID}],
                                    }}>
                                    <Button color="primary" autoFocus>
                                        Agree
                                    </Button>
                                    </Link>
                                </DialogActions>
                            </Dialog>
                        </div>                    </Paper>
                </Paper>
            </div>
        </div>
    );
}