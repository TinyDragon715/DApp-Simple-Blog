import React, { Component } from 'react'
import blogUtils from '../utils/blogUtils';

class PublishForm extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", content: "" }
    }
    mySubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const title = this.state.title
            const content = this.state.content
            if (title.length > 40 || content.length > 300) {
                alert("Title maximum length is 40 chars\nContent max length is 300 chars")
            } else {
                await blogUtils.publishSubmission(title, content, 0)
                this.props.changeTab("Home")
            }

        } catch (error) {
            console.log(error)
        }
    }
    myChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        if (!blogUtils.accounts) {
            return <div> Couldn't detect account. Please verify that you have metamask installed and running </div>
        }
        if (blogUtils.networkId != 3) {
            return <p>Please connect to the ropsten network.</p>
        }
        return (
            <div>
                <h3>Write something here..</h3>
                <form onSubmit={this.mySubmitHandler}>
                    <input placeholder="Title (40 chars max)"
                        type='text' name="title"
                        onChange={this.myChangeHandler} maxLength="40" className="publishing"
                    /><br></br>
                    <textarea className="publishing" placeholder="Talk about whatever you like! Try to keep it civil though (300 chars max)" maxLength="300" name="content" onChange={this.myChangeHandler}></textarea>
                    <br></br>
                    <input value="Publish"
                        type='submit'
                    />
                </form>
            </div>
        );
    }
}

export default PublishForm;