import React, { Component } from 'react'
import blogUtils from '../../utils/blogUtils';

class RewardForm extends Component {
    constructor(props) {
        super(props);
        this.state = { rewardAmount: 0 };
    }

    componentDidMount() {
        blogUtils.instance.events.RewardSubmission({}, (err, event) => {
            alert("Success! You just rewarded ", event.returnValues.writer);
            console.log("EVENT!! Rewarded submission with ID ", event.returnValues.submissionID)
        })
    }

    mySubmitHandler = async (event) => {
        event.preventDefault();
        const submissionID = this.props.submissionIndex + 1
        await blogUtils.getSubmission(submissionID).then(async (sub) => {
            if (sub.writer === blogUtils.accounts[0]) {
                alert("You can't reward yourself, silly!");
            } else {
                await blogUtils.rewardSubmission(submissionID, this.state.rewardAmount)
                this.props.fetchSubmissions()
            }
        });
    }
    myChangeHandler = (event) => {
        this.setState({ rewardAmount: event.target.value });
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <input
                    type='number'
                    onChange={this.myChangeHandler}
                />
                <input value="Reward (eth)"
                    type='submit'
                />
            </form>
        );
    }
}

export default RewardForm;