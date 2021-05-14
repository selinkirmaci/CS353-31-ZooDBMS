import React, {Component, useEffect} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';

export default function DonationDetailModal(props)  {
    const [money,setMoney] = React.useState(0);
    const[donationAmount,setDonationAmount] = React.useState("");

    React.useEffect(()=>{

        Axios.post("http://localhost:3001/api/getUserMoney", {
            userID:localStorage.getItem('userID'),
        }).then((response)=>{
            setMoney(response.data);
            //console.log(money);
        });



    });
    const submit = () => {

        /*
        Axios.put("http://localhost:3001/api/updateUserMoney",{
            userID: props.userId,
            price: props.price,
        });
         */
        const firstReq =   Axios.put("http://localhost:3001/api/updateMoneyRaised",{
            userID: localStorage.getItem('userID'),
            price: donationAmount,
            eventID : props.eventID,

        });
        const secondReq =  Axios.put("http://localhost:3001/api/updateUserMoney",{
            userID: localStorage.getItem('userID'),
            price: donationAmount,
        });

        Axios.all([firstReq,secondReq]).then((response)=>{
            alert('success');
           },[]);
        alert('success');
        props.onHide();

    };


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            scrollable = "true"
            centered >
            <Modal.Header style={{maxHeight:'10em'}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>{props.title}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>You have {money} amount of money.</h5>
                <br/>
                <h5>How much would you like to donate?</h5>
                <br/>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Money"
                    type="number"
                    fullWidth
                    onChange={(e)=>{setDonationAmount(e.target.value);}}
                />

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submit}>{props.leftModalButton}</Button>
                <Button onClick={props.onHide}>{props.rightModalButton}</Button>
            </Modal.Footer>
        </Modal>
    );
}