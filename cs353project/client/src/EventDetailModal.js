import React, {Component, useEffect} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Axios from 'axios';
import DisplayComments from "./DisplayComments";

export default function EventDetailModal(props)  {

    const [comments,setComments] = React.useState([]);
    const [money,setMoney] = React.useState([]);

    React.useEffect(()=>{
        const firstReq = Axios.post("http://localhost:3001/api/displayComments", {
            eventID:props.eventID,
        });
        const secondReq = Axios.post("http://localhost:3001/api/getUserMoney", {
            userID: localStorage.getItem('userID'),
        });
        Axios.all([firstReq,secondReq]).then((response)=>{
            setComments(response[0].data);
            setMoney(response[1].data[0]);
        });
    },[]);

    const submit = () => {
        console.log( money.amountOfMoney);
        Axios.post("http://localhost:3001/api/registerToEvent",{
            userID: localStorage.getItem('userID'),
            eventID: props.eventID,
            price: props.price,
            money : money.amountOfMoney,

        }).then((response)=>{
            console.log(response);
            if(response.data==="")
                alert('Failed to register, your money is not enough!');
            else
                alert('successful register');
        });

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
                <h5>Time</h5>
                {props.time}
                <h5 style={{marginTop:"2em"}}>Capacity</h5>
                {props.leftcap}
                <h5 style={{marginTop:"2em"}}>Duration</h5>
                {props.duration}
                <br/>
                <h5 style={{marginTop:"2em"}}>Price</h5>
                {props.price}
                <br/>
                <h5 style={{marginTop:"2em"}}>Location</h5>
                {props.location}
                <br/>
                <DisplayComments comments = {comments} eventID = {props.eventID}></DisplayComments>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submit}>{props.leftModalButton}</Button>
                <Button onClick={props.onHide}>{props.rightModalButton}</Button>
            </Modal.Footer>
        </Modal>
    );
}