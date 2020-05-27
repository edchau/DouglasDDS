import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Input from "./Input.js"
import Admin from './Admin';
import DelayedRedirect from "./DelayedRedirect.js"
import logo from './ddslogo.png'

const Administrator = () => {
  return (
    <div className = "center">
      <h2>Patient Check In List</h2>
      <br/>
      <Admin/>
    </div>
  );
};

const CheckIn = () => {
  return (
    <div className = "center">
      <h2>Welcome to Douglas Nguyen, DDS!</h2>
      <br/>
      <Input/>
    </div>
  );
};

const Success = () => {
  return (
    <div className = "center">
      <h2>Thank you!</h2>
      <h3> We will contact you when we're ready</h3>
    </div>
  );
};

const Error = () => (
  <div>
      <DelayedRedirect></DelayedRedirect>
  </div>
);

class App extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <div className = "App">
          <div className = "App__Form">
            <img src={logo} width="250" height="100" className="center"/>
            <Switch>
              <Route exact path="/Gt9jakZ6RMBZwRP5z3" component={Administrator}/>
              <Route exact path="/" component={CheckIn}/>
              <Route exact path="/success" component={Success}/>
              <Route component={Error}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
