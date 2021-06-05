pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;
// Users can publish articles
// Users can comment on articles
// Users can like/dislike articles/comments
// Users can pay for their article to be featured
// Each post creation costs 0.05 ether
contract Blog {

  struct Submission{
    address payable writer;
    string title;
    string content;
    uint publishingDate;
    uint parentID;
    uint reward;
  }

  Submission[] submissions;

  address owner = msg.sender;

  uint public postCreationCost = 0.05 ether;

  modifier ownerOnly{
      require(msg.sender == owner,"Only owner can call this function");
      _;
  }

  event SubmissionEvent(uint submissionID);
  event RewardSubmission(uint submissionID);
    
  function publishSubmission(string memory _title,string memory _content, uint _parentID) public payable returns(uint) {
    require(msg.value>=postCreationCost,"Post creation cost is 0.05 ether");
    if(_parentID != 0) // 0 means no parent
    require(_parentID<submissions.length,"Parent ID doesn't point to a submission.");
    Submission memory newSubmission = Submission(msg.sender,_title,_content,now,_parentID,0);
    uint submissionID = submissions.push(newSubmission);
    emit SubmissionEvent(submissionID);
    return submissionID;
  }

  function rewardSubmission(uint _submissionID) public payable {
    require(_submissionID>0 && _submissionID<=submissions.length,"Submission doesn't exist");
    submissions[_submissionID-1].writer.transfer(msg.value);
    submissions[_submissionID-1].reward += msg.value;
    emit RewardSubmission(_submissionID);
  }

  function withdraw(uint _amount) public ownerOnly {
    require(_amount*(1 ether)>0,"Your either trying to overflow me or you want to withdraw 0 eth. Not cool.");
    require(_amount*(1 ether)<=address(this).balance*(1 ether),"Contract balance is lower that requested amount");
    msg.sender.transfer(_amount);
  }

  function getContractBalance() public view ownerOnly returns (uint256) {
    return address(this).balance;
  }
    
  function changePostCreationCost(uint _newValue) public ownerOnly {
        postCreationCost = _newValue;
  }

  function getAllSubmissions() public view returns(Submission[] memory){
    return submissions;
  }

  function getSubmissionsLength() public view returns (uint){
    return submissions.length;
  }

  function getSubmission(uint _submissionID) public view returns(Submission memory){
    require(_submissionID>0 && _submissionID<=submissions.length,"Submission doesn't exist");
    return submissions[_submissionID-1];
  }
}                                                                                                         