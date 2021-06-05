import React, { Component } from 'react'
import _ from "lodash";
import RewardForm from './RewardForm'
import blogUtils from '../utils/blogUtils';


class Submissions extends Component {
    state = { submissionsCount: 0, web3: null, accounts: null, contract: null, submissions: [] };

    componentDidMount = async () => {
        try {
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            await blogUtils.getVars()
            const web3 = blogUtils.web3;
            const accounts = blogUtils.accounts;
            const instance = blogUtils.instance;
            if (accounts) {
                this.setState(
                    { web3, accounts, contract: instance },
                    this.fetchSubmissions
                );
                // await instance.methods.publishSubmission("content", "title", 0).send({ from: accounts[0], value: web3.utils.toWei("0.05", "ether") });
                this.state.contract.events.SubmissionEvent({}, (err, event) => {
                    console.log("EVENT!! Added new submission with ID ", event.returnValues.submissionID)
                    this.fetchSubmissions()
                })
            }
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    fetchSubmissions = async () => {

        const contract = this.state.contract;
        let submissions = [];
        await contract.methods
            .getSubmissionsLength()
            .call()
            .then(res => {
                this.setState({ submissionsCount: res });
            }).then(async () => {
                if (this.state.submissionsCount !== 0) {
                    await contract.methods
                        .getAllSubmissions()
                        .call()
                        .then(res => {
                            submissions = res;
                        });
                    this.setState({ submissions: submissions });
                }
            });
    };

    render() {
        if (!this.state.accounts) {
            return <p> Couldn't detect account. Please verify that you have metamask installed and running </p>
        }
        if (blogUtils.networkId != 3) {
            return <p>Please connect to the ropsten network.</p>
        }
        let Submissions = [];

        _.forEachRight(this.state.submissions, (value, index) => {
            let date = new Date(value[3] * 1000)
            Submissions.push(
                <div className="submission" key={index}>
                    <h2> {value[1]} </h2>{" "}
                    <pre>{date.toString()}</pre>
                    <pre>
                        Written by {value[0]}, Rewards:{" "}
                        {this.state.web3.utils.fromWei(value["reward"], "ether")} eth{" "}
                    </pre>{" "}
                    <p> {value[2]} </p>{" "}
                    <RewardForm submissionIndex={index} fetchSubmissions={this.fetchSubmissions} />
                </div>
            );
        });
        return (
            <div>
                <h4>A total of {this.state.submissionsCount} submission(s) currently exist on the blockchain</h4>
                {Submissions}
            </div>
        );
    }
}

export default Submissions;