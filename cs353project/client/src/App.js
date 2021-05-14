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
import Login from "./VisitorPages/Login";
import SignUp from "./VisitorPages/SignUp";
import RestaurantPage from "./RestaurantPage/RestaurantPage";
import VisitorHomePage from "./VisitorPages/VisitorHomePage";
import GiftShopPage from "./GiftShopPage/GiftShopPage";
import VisitorUserProfile from "./VisitorPages/VisitorUserProfile";
import VisitorMoney from "./VisitorPages/VisitorMoney";
import VisitorCompliantPage from "./VisitorPages/VisitorCompliantPage";
import DisplayTrainings from "./KeeperPages/DisplayTrainings";
import DisplayTreatments from "./VeterinarianPages/DisplayTreatments";
import DisplayEducationalPrograms from "./VeterinarianPages/DisplayEducationalPrograms";

function App() {
  return (
      <Router>
          <Switch>
              <Route path = "/" exact component={Login}></Route>
              <Route path = "/login" exact component={Login}></Route>
              <Route path = "/signup" exact component={SignUp}></Route>
              <Route path = "/restaurant" exact component={RestaurantPage}></Route>
              <Route path = "/visitorhomepage" exact component={VisitorHomePage}></Route>
              <Route path = "/giftshop" exact component={GiftShopPage}></Route>
              <Route path = "/visitorprofile" exact component={VisitorUserProfile}></Route>
              <Route path = "/visitormoney" exact component={VisitorMoney}></Route>
              <Route path = "/coordinatorhomepage" exact component={CoordinatorHomepage}></Route>
              <Route path = "/coordinatorcagepage" exact component={CoordinatorCagePage}></Route>
              <Route path = "/coordinatorcagepageinfo" exact component={CoordinatorCagePageInfo}></Route>
              <Route path = "/coordinatoranimalinfo" component={AnimalInformationPage}></Route>
              <Route path = "/coordinatorcomplaints" exact component={ComplaintDisplay}></Route>
              <Route path = "/coordinatorrefundrequests" exact component={RefundRequestPage}></Route>
              <Route path = "/keeperhomepage" exact component={KeeperHomepage}></Route>
              <Route path = "/veterinarianhomepage" exact component={VeterinarianHomepage}></Route>
              <Route path = "/visitorcomplaintpage" exact component={VisitorCompliantPage}></Route>
              <Route path = "/displayTrainings" exact component={DisplayTrainings}></Route>
              <Route path = "/displayTreatments" exact component={DisplayTreatments}></Route>
              <Route path = "/displayEducationalProgram" exact component={DisplayEducationalPrograms}></Route>





          </Switch>
      </Router>
  );
}
/*
function test()
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


 */
export default App;
