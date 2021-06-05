import React, { Component } from 'react'
import blogUtils from '../utils/blogUtils'

export class MyRewards extends Component {
    render() {
        if (blogUtils.networkId != 3) {
            return <p>Please connect to the ropsten network.</p>
        }
        return (
            <div>
                <p>Coming soon..</p>
            </div>
        )
    }
}

export default MyRewards