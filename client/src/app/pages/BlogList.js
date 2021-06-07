import React, { Component, useState, useEffect } from 'react'
import _ from "lodash";
import RewardForm from './RewardForm'
import { Button } from "shards-react";
import blogUtils from '../../utils/blogUtils';
import ShowPeepModal from "../components/ShowPeepModal.js";
import SendTipPanel from "../components/SendTipPanel.js";
import defaultImage from "../../assets/images/oilfield-logo.png";

const BlogList = () => {
  const [blogStates, setBlogStates] = useState({
    submissionsCount: 0,
    web3: null,
    accounts: null,
    contract: null,
    submissions: []
  });

  const [displayModal, setDisplayModal] = useState(false);
  const [displayTip, setDisplayTip] = useState(false);
  const [selectedBlogData, setSelectedBlogData] = useState([]);

  useEffect(() => {
    getInitializeData();
  }, []);  

  const getInitializeData = async () => {
    try {
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      const blogUtilsData = await blogUtils.getVars();
      const web3 = blogUtilsData.web3;
      const accounts = blogUtilsData.accounts;
      const instance = blogUtilsData.instance;

      if (accounts) {     
        setBlogStates((prevState) => ({
          ...prevState,
          web3: blogUtilsData.web3,
          accounts: blogUtilsData.accounts,
          contract: instance
        }));

        fetchSubmissions(instance);

        // await instance.methods.publishSubmission("content", "title", 0).send({ from: accounts[0], value: web3.utils.toWei("0.05", "ether") });
        blogStates.contract.events.SubmissionEvent({}, (err, event) => {
          console.log("EVENT!! Added new submission with ID ", event.returnValues.submissionID)
          fetchSubmissions()
        });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const fetchSubmissions = async (contract) => {
    let submissions = [];
    let subMissionCount = 0;

    await contract.methods
      .getSubmissionsLength()
      .call()
      .then(res => {
        subMissionCount = res;
        setBlogStates((prevState) => ({
          ...prevState,
          submissionsCount: subMissionCount
        }));
      }).then(async () => {
          if (subMissionCount !== 0) {
            await contract.methods
              .getAllSubmissions()
              .call()
              .then(res => {
                setBlogStates((prevState) => ({
                  ...prevState,
                  submissions: res
                }));
              });

              
          }
      });
  };

  const selectBlogHandler = (blog) => {
    setDisplayModal(true); 
    setSelectedBlogData(blog);
  };

  const closePeepModal = () => {
    setDisplayModal(false); 
  }

  const replyHandler = (e, blog) => {
    e.stopPropagation();
  }

  const redeemHandler = (e, blog) => {
    e.stopPropagation();
    setDisplayTip(true);
  }

  if (!blogStates.accounts) {
      return <p> Couldn't detect account. Please verify that you have metamask installed and running </p>
  }

  if (blogUtils.networkId != 3) {
      return <p>Please connect to the ropsten network.</p>
  }

  const BlogArrayList = () => {
    return (
      <div className="bg-white">
        {
          blogStates.submissions.map((blog, index) => {
            let date = new Date(blog[3] * 1000);

            return (
              <div 
                className="blog-item d-flex justify-content-between px-3 pt-2 pb-1" 
                key={index}
                onClick={() => selectBlogHandler(blog)}
              >
                <div className="blog-avatar mr-3">
                  <img src={defaultImage} />
                </div>
                <div className="blog-content">
                  <h5> {blog[1]} </h5>{" "}
                  {/* <pre>{date.toString()}</pre>
                  <pre>
                      Written by {blog[0]}, Rewards:{" "}
                      {blogStates.web3.utils.fromWei(blog["reward"], "ether")} eth{" "}
                  </pre>{" "} */}
                  <p> {blog[2]} </p>{" "}
                  {/* <RewardForm submissionIndex={index} fetchSubmissions={this.fetchSubmissions} /> */}
                  <div className="blog-bottom">
                    <i 
                      className="material-icons"
                      onClick={(e) => replyHandler(e, blog)}
                    >
                      reply
                    </i>
                    <i 
                      className="material-icons icon-redeem"
                      onClick={(e) => redeemHandler(e, blog)}
                    >
                      redeem
                    </i>
                  </div>
                  {displayTip && <SendTipPanel />}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
  
  return (
    <>
      {/* <h4>A total of {blogStates.submissionsCount} submission(s) currently exist on the blockchain</h4> */}
      <BlogArrayList />
      <ShowPeepModal 
        open={displayModal} toggle={closePeepModal} blogData={selectedBlogData}
      />
    </>
  );
}

export default BlogList;