import React from 'react';
import { Redirect } from 'react-router'


class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = { first: "", last: "", number: "", error: false };
    }
    handleChangeFirst(event) {
      this.setState({ first: event.target.value });
    }
    handleChangeLast(event) {
      this.setState({ last: event.target.value });
    }
    handleChangeNum(event) {
      this.setState({ number: event.target.value });
    }
    
    handleSubmit = async e => {
      var num = this.state.number.trim().replace(/\D/g,'')
      if (isNaN(num) || num.length > 10
          || num.length < 7 || (num.length > 7 && num.length < 10)) {
        return alert("Please enter a valid phone number")
      } else {
        fetch('/patients', {method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({ first: this.state.first.trim(), 
                        last: this.state.last.trim(),
                        number: num})})
        .catch(err => this.setState({error:true}));
        this.setState({pre:true})
      }
    };

    render() {
      if (this.state.pre) {
        return <Redirect to={'/success'}/>
      }

      return (
        <div>
        <p>Please fill out this form to check in upon arrival.</p>
        <br/>
        <br/>
        <form className = "FormFields">
          <label className = "FormField__Label">First Name</label>
          <br/>
            <input
              className = "FormField__Input"
              onChange={this.handleChangeFirst.bind(this)}
              value={this.state.first} required
            />
          <br/>
          <br/>
          <label className = "FormField__Label">Last Name</label>
          <br/>
            <input
              className = "FormField__Input"
              onChange={this.handleChangeLast.bind(this)}
              value={this.state.last} required
            />
          <br/>
          <br/>
          <label className = "FormField__Label">Phone Number</label>
          <br/>
            <input
              className = "FormField__Input"
              onChange={this.handleChangeNum.bind(this)}
              value={this.state.number} required
            />
          <br/>
          <br/>
          <button className = "FormField__Button" onClick={this.handleSubmit.bind(this)}>Check In</button>
        </form>
        </div>
      );
    }
  }

  export default Input;
