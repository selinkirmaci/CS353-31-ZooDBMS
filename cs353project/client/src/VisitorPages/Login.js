import {Paper, Checkbox, FormControlLabel} from "@material-ui/core";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React from "react";
import {Link} from "react-router-dom";

export default function Login()
{
    // taken from the site
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
        }
    };

    const { admin, visitor, keeper, veterinarian, link } = state;

    return (
        <div class = "row no-gutters" >
            <div class = "col no-gutters" style={{ height : '100vh', width : '80%' ,backgroundColor: 'white'}}>
                <Paper style={{backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)' , height : '100vh', width : '80%' }}></Paper>
            </div>
            <div className="col no-gutters"  style={{ height : '100vh', width : '120%' }}>
                <Paper elevation={0} style={{ height : '100vh', width : '100%' }}>
                    <Paper elevation={0} style={{
                        position: 'absolute', left: '30%', top: '50%',
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
                                    <InputText style={{color: '#8C4FB7'}} id="firstname4" type="text"/>
                                </div>
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="lastname4" className="p-col-12 p-md-2">Password</label>
                                <div className="p-col-12 p-md-10">
                                    <InputText type="password"  id="lastname4" />
                                </div>
                                <FormControlLabel
                                    style={{marginTop : "2em"}}
                                    control={<Checkbox checked={admin} onChange={handleChange} name="admin" />}
                                    label="Is Admin"
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
                        <Link to={link}>
                             <Button style={{color: 'white',backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)' , width : '30%',left: '41%'}} label="Sign In" className="p-button-rounded " />
                        </Link>
                        <div>
                            <br/>
                            <Link to="/signup">
                                 <li style={{listStyle: 'none',marginLeft: '35%', textDecorationLine: 'underline',color: '#8C4FB7'}}>Don't have an account yet?</li>
                            </Link>
                        </div>
                    </Paper>
                </Paper>
            </div>
        </div>
    );
}