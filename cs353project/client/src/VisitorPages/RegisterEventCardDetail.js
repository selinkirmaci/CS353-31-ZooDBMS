import React, {Component, useEffect} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Axios from 'axios';

export default function EventDetailModal(props)  {

    const submit = () => {
        /*
        Axios.put("http://localhost:3001/api/updateUserMoney",{
            userID: props.userId,
            price: props.price,
        });

         */
        Axios.post("http://localhost:3001/api/registerToEvent",{
            userID: props.userId,
            eventID: props.eventID,
            price: props.price,

        }).then((response)=>{
            console.log(response.data);
            //setUserID(response.data);
            alert('success');
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
                <h5 style={{marginTop:"2em"}}>Left Capacity</h5>
                {props.leftcap}
                <h5 style={{marginTop:"2em"}}>Duration</h5>
                {props.duration}
                <br/>
                <br/>
            </Modal.Body>
        </Modal>
    );
}