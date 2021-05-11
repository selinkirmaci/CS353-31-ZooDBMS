import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EventDetailModal from "./EventDetailModal";
import axios from 'axios';

export class CardDemo extends Component {
    constructor(props) {
        super(props);
    }
   // const [modalShow, setModalShow] = React.useState(false);
    state = { //setting up the state
        setModalShow : false,
        selectedFile : null
    }
    fileSelectedHandler= event =>{
            this.setState({
                selectedFile: event.target.files[0]
            })
        }
    render() {

        const header = (
            <div>
            <img alt="Card" src="/images/t-logo.jpg"/>
            </div>
        );
        const footer = (
            <span>
                <Button label="Details"  style={{marginLeft: '14em'}} onClick={() =>
                    this.setState({setModalShow : true})} />
                <EventDetailModal
                    title = {this.props.title}
                    start = {this.props.start}
                    end = {this.props.end}
                    location = {this.props.location}
                    leftcap ={this.props.leftcap}
                    show={this.state.setModalShow}
                    onHide={() => this.setState({setModalShow : false})}
                />
            </span>
        );

        return (
            <div>
                <Card title="Advanced Card" subTitle="Subtitle" style={{marginLeft:'1.5em',width: '300px'}}
                      className="ui-card-shadow" footer={footer} header={header}>
                    <Card.Header>
                        <img alt="Card" src="/images/square.png"/>
                    </Card.Header>
                    <div>Event Description {this.state.modalShow}
                        <h5>{this.props.title}</h5>
                    </div>
                    <Card.Footer>
                        <span>
                <Button label="Details"  style={{marginLeft: '10em',marginRight:'1em'}} onClick={() =>
                    this.setState({setModalShow : true})} >Details </Button>
                <EventDetailModal
                    title = {this.props.title}
                    start = {this.props.start}
                    end = {this.props.end}
                    location = {this.props.location}
                    leftcap ={this.props.leftcap}
                    show={this.state.setModalShow}
                    onHide={() => this.setState({setModalShow : false})}
                />
            </span></Card.Footer>
                </Card>
            </div>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CardDemo />, rootElement);