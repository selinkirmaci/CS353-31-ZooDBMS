import {Button} from "primereact/button";
import {Paper} from "@material-ui/core";
import {Card} from "@material-ui/core";
import {InputText} from "primereact/inputtext";
import React from "react";
import {Link} from "react-router-dom";

import Axios from 'axios';


export default function SignUp()
{
    const [name,setName] = React.useState('');
    const [surname,setSurname] = React.useState('');
    const [birthday,setBirtday] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [cardOwner,setCardOwner] = React.useState('');
    const [creditCardNo,setCreditCardNo] = React.useState('');
    const [cvc,setCvc] = React.useState('');
    const [expirationDate,setExpirationDate] = React.useState('');
    const[amountOfMoney,setamountOfMoney] = React.useState('');

    const submit = () =>{
        Axios.post("http://localhost:3001/api/visitor/signup", {
            name:name,
            surname:surname,
            birthday:birthday,
            email:email,
            username:username,
            password:password,
            cardOwner:cardOwner,
            creditCardNo:creditCardNo,
            cvc:cvc,
            expirationDate:expirationDate,
            amountOfMoney:amountOfMoney,
        }).then(()=>{
            alert('success');
        });
    }


    const header =<span>
            <br/>
            <text class = "text"  style = {{left: '50%',margin: '15em'}} >WELCOME</text>
            </span>;
    const footer = <span>
                <Button label="Sign Up"  style={{marginLeft: '16em',marginRight: '.4em',color: 'white',backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)' , width : '25%'}}/>
                <Link to={"/login"}>
                        <Button style={{ color: 'white',backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)' , width : '25%'}} label="Cancel" className="p-button-secondary " />
                </Link>
                </span>;
    return(
        <div style={{height : '130vh', width : '100%',backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)'}}>
            <Paper style={{backgroundImage: 'linear-gradient(to bottom right,#8C4FB7,#3834DE)'}}>
                <Card class="rounded-card"  header={header} footer={footer} style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    minHeight: '60%',
                    justifyContent: "center",
                    borderRadius: '20px'
                }}>
                    <div style = {{marginTop : '10em'}} className="p-fluid">
                        <br/>
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="firstname6">Name</label>
                                <InputText id="firstname6" type="text" onChange={(e)=>{setName(e.target.value);}}/>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="lastname6">Surname</label>
                                <InputText id="lastname6" type="text" onChange={(e)=>{setSurname(e.target.value);}}/>
                            </div>
                        </div>
                        <br/>
                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">Birth Year</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="text" onChange={(e)=>{setBirtday(e.target.value);}}/>
                            </div>
                        </div>
                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">Email</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="email"onChange={(e)=>{setEmail(e.target.value);}}/>
                            </div>
                        </div>
                        <br/>
                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">Username</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="text" onChange={(e)=>{setUsername(e.target.value);}}/>
                            </div>
                        </div>
                        <br/>
                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">Password</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="text" onChange={(e)=>{setPassword(e.target.value);}}/>
                            </div>
                        </div>
                        <br/>
                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">Card Owner</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="text" onChange={(e)=>{setCardOwner(e.target.value);}}/>
                            </div>
                        </div>

                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">Card Number</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="text" onChange={(e)=>{setCreditCardNo(e.target.value);}}/>
                            </div>
                        </div>

                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">CVC</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="text" onChange={(e)=>{setCvc(e.target.value);}}/>
                            </div>
                        </div>

                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">Expration Date</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="text" onChange={(e)=>{setExpirationDate(e.target.value);}}/>
                            </div>
                        </div>
                        <div className="p-field p-grid">
                            <label htmlFor="lastname4" className="p-col-12 p-md-2">Amount of Money to Take</label>
                            <div className="p-col-12 p-md-10">
                                <InputText id="lastname4" type="text" onChange={(e)=>{setamountOfMoney(e.target.value);}}/>
                            </div>
                        </div>
                        <div className="p-field p-grid">
                            <Link to="/login">
                                <Button variant = "contained" color = "primary" label="Signup" onClick={submit}></Button>
                            </Link>
                        </div>
                    </div>

                </Card>
            </Paper>
        </div>
    );
}