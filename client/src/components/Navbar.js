import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <div className="topNav">
                <button name="Home" onClick={this.props.buttonClicked} className="active">Home</button>
                <button name="Write" onClick={this.props.buttonClicked}>Write</button>
                <button name="Rewards" onClick={this.props.buttonClicked}>My Rewards</button>
            </div>
        );
    }
}

export default Navbar;