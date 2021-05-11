import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export default function EventDetailModal(props)  {
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
                <h5>Start & End Dates</h5>
                {props.start} - {props.end}
                <h5 style={{marginTop:"2em"}}>Left Capacity</h5>
                {props.leftcap}
                <br/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>{props.leftModalButton}</Button>
                <Button onClick={props.onHide}>{props.rightModalButton}</Button>
            </Modal.Footer>
        </Modal>
    );
}