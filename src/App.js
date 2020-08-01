import React from 'react';
import logo from './logo.svg';
import { Route, Switch, Link,useLocation } from 'react-router-dom';
import Approved from './Components/approved'
import Pending from './Components/pending_req'
import Reject from './Components/reject'
import Login from './Components/login'
import Home from './Components/appHome'
import Header from './Components/headers'

function App() {
  let location = useLocation().pathname
  let HeaderComp = location!=="/"?<Header />:null
  return (
    <div>
      <Route path="/" exact component={Login} />
     {HeaderComp} 
      <Route path="/home" component={Home} />
      <Route path="/pending_req" component={Pending} />
      <Route path="/approved_req" component={Approved} />
      <Route path="/reject_req" component={Reject} />
    </div>
  );
}

export default App;
