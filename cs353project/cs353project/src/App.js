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


function App() {
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

export default App;
