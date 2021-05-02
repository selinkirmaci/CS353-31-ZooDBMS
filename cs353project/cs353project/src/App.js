import './App.css';
import CoordinatorHomepage from "./CoordinatorPages/CoordinatorHomepage";
import CoordinatorCagePage from "./CoordinatorPages/CoordinatorCagePage";
import CoordinatorCagePageInfo from "./CoordinatorPages/CoordinatorCagePageInfo";

import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';


function App() {
  return (
      <Router>
          <Switch>
              <Route path = "/" exact component={CoordinatorHomepage}></Route>
              <Route path = "/coordinatorhomepage" exact component={CoordinatorHomepage}></Route>
              <Route path = "/coordinatorcagepage" exact component={CoordinatorCagePage}></Route>
              <Route path = "/coordinatorcagepageinfo" exact component={CoordinatorCagePageInfo}></Route>

          </Switch>
      </Router>
  );
}

export default App;
