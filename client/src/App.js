import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Input from "./Input.js"
import Admin from './Admin';
import DelayedRedirect from "./DelayedRedirect.js"
import logo from './ddslogo.png'

const Administrator = () => {
  return (
    <div>
      <h2>Patient Check In List</h2>
      <br/>
      <Admin/>
    </div>
  );
};

const CheckIn = () => {
  return (
    <div className = "FormCenter">
      <h2>Welcome to Douglas Nguyen, DDS!</h2>
      <br/>
      <Input/>
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
            <img src={logo} width="250" height="100"/>
            <Switch>
              <Route exact path="/Gt9jakZ6RMBZwRP5z3" component={Administrator}/>
              <Route exact path="/" component={CheckIn}/>
              <Route component={Error}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
