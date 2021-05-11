import './App.css';
import CoordinatorHomepage from "./CoordinatorPages/CoordinatorHomepage";
import CoordinatorCagePage from "./CoordinatorPages/CoordinatorCagePage";
import CoordinatorCagePageInfo from "./CoordinatorPages/CoordinatorCagePageInfo";

import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';
import AnimalInformationPage from "./CoordinatorPages/AnimalInformationPage";
import ComplaintDisplay from "./CoordinatorPages/ComplaintDisplay";
import RefundRequestPage from "./CoordinatorPages/RefundRequestPage";
import KeeperHomepage from "./KeeperPages/KeeperHomapage";
import classtext from "./CoordinatorPages/classtext";
import VeterinarianHomepage from "./VeterinarianPages/VeterinarianHomepage";
import React, {useState} from "react";
import Axios from 'axios';

function test() {
  return (
      <Router>
          <Switch>
              <Route path = "/" exact component={CoordinatorHomepage}></Route>
              <Route path = "/coordinatorhomepage" exact component={CoordinatorHomepage}></Route>
              <Route path = "/coordinatorcagepage" exact component={CoordinatorCagePage}></Route>
              <Route path = "/coordinatorcagepageinfo" exact component={CoordinatorCagePageInfo}></Route>
              <Route path = "/coordinatoranimalinfo" component={AnimalInformationPage}></Route>
              <Route path = "/coordinatorcomplaints" exact component={ComplaintDisplay}></Route>
              <Route path = "/coordinatorrefundrequests" exact component={RefundRequestPage}></Route>
              <Route path = "/keeperhomepage" exact component={KeeperHomepage}></Route>
              <Route path = "/veterinarianhomepage" exact component={VeterinarianHomepage}></Route>

          </Switch>
      </Router>
  );
}
function App()
{
    const [cageID,setcageID] = React.useState('');
    const [capacity,setCapacity] = React.useState('');
    const [number,setNumber] = React.useState('');

    const submit = () =>{
        Axios.post("http://localhost:3001/api/insert", {
            cageID:cageID,
            capacity:capacity,
            number:number}).then(()=>{
                alert('success');
        });
    }
    return(
        <div>
            <h1>Crudd</h1>
            <div>
                <label>id</label>
                <input
                    type="text"
                    name="cageId"
                    onChange={(e)=>{
                        setcageID(e.target.value);
                    }}
                />
                <label>capacity</label>
                <input
                    type="text"
                    name="capactiy"
                    onChange={(e)=>{
                        setCapacity(e.target.value);
                    }}
                />
                <label>number</label>
                <input
                    type="text"
                    name="number"
                    onChange={(e)=>{
                        setNumber(e.target.value);
                    }}
                />
                <button onClick={submit}>submit</button>
            </div>
        </div>
    );
}

export default App;
