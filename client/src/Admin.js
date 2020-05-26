import React from 'react';

class Admin extends React.Component {
    constructor(props) {
      super(props);
      this.state = { patients: [] };
      this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
        /*
          stop getData() from continuing to run even
          after unmounting this component. Notice we are calling
          'clearTimeout()` here rather than `clearInterval()` as
          in the previous example.
        */
        clearTimeout(this.intervalID);
    }

    getData() {
        fetch('/patients')
        .then(res => res.json())
        .then(patients => {
            this.setState({ patients })
        })
        .catch(err => console.log(err));
        this.intervalID = setTimeout(this.getData, 5000);
    }

    updateData(id, check) {
      fetch('/patients/' + id, {method: 'PATCH',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({ id: id, checked: check})})
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
          <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-1">Name</div>
                <div class="col col-2">Phone Number</div>
                <div class="col col-3">Time</div>
                <div class="col col-4">Status</div>
              </li>
            {this.state.patients.map(user =>
              <li class="table-row">
                <div class="col col-1" data-label="Name">{user.first} {user.last}</div>
                <div class="col col-2" data-label="Phone Number">{user.number}</div>
                <div class="col col-3" data-label="Time">{user.time}</div>
                <div class="col col-4" data-label="Status">
                <label class="check">
                    <input type="checkbox" checked={user.checked} 
                        onClick = {this.updateData.bind(this, user.id, !user.checked)}/>
                    <div class="box"></div>
                </label>
                </div>
              </li>
            )}
          </ul>
        <br/>
        <br/>
            <button onClick = {this.deleteData.bind(this)} className="FormField__Button">Clear</button>
        </div>
      );
    }
  }

export default Admin;