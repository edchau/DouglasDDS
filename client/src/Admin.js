import React from 'react';

class Admin extends React.Component {
    constructor(props) {
      super(props);
      this.state = { patients: [], user:"", pass:""};
      this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    handleChangeUser(event) {
      this.setState({ user: event.target.value });
    }

    handleChangePass(event) {
      this.setState({ pass: event.target.value });
    }

    getData() {
        fetch('/patients')
        .then(res => res.json())
        .then(patients => this.setState({ patients }))
        .catch(err => console.log(err));
        this.intervalID = setTimeout(this.getData, 5000);
    }

    updateData(id, check) {
      fetch('/patients/' + id.toString(), {method: 'PATCH',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({checked: check})})
        .catch(err => console.log(err));
      window.location.reload(false);
  }

    deleteData() {
      fetch('/patients', {method: 'DELETE'})
      .catch(err => console.log(err));
      window.location.reload(false);
    }

    render() {
      return (
        <div>
          <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Name</div>
                <div className="col col-2">Phone Number</div>
                <div className="col col-3">Time</div>
                <div className="col col-4">Status</div>
              </li>
            {this.state.patients.map(user =>
              <li className="table-row">
                <div className="col col-1" data-label="Name">{user.first} {user.last}</div>
                <div className="col col-2" data-label="Phone Number">{user.number}</div>
                <div className="col col-3" data-label="Time">{user.time}</div>
                <div className="col col-4" data-label="Status">
                <label className="check">
                    <input type="checkbox" checked={user.checked} 
                        onClick = {this.updateData.bind(this, user.id, !user.checked)}/>
                    <div className="box"></div>
                </label>
                </div>
              </li>
            )}
          </ul>
        <br/>
        <br/>
          <button onClick = {() => { if (window.confirm('Are you sure you want to clear this list?')) this.deleteData()}}
            className="FormField__Button">Clear</button>
        </div>
      );
    }
  }

export default Admin;