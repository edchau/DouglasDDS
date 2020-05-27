import React from 'react';
import { Redirect } from 'react-router'

class DelayedRedirect extends React.Component {
    state = {
        redirect: false,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                redirect: true,
            })
        }, 3000)
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={'/'}/>
            )
        }

        return (
            <div>
                <h1>Oops! An Error Occurred</h1>
                <h2>Redirecting to Check In Page...</h2>
            </div>
        )
    }
}

export default DelayedRedirect;

