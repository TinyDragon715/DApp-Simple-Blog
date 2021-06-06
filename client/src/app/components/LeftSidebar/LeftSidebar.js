import React, { useEffect, useState } from 'react';
import defaultCoverImage from "../../../assets/images/oilfield.jpg";
import logo from "../../../assets/images/oilfield-logo.png";

const LeftSidebar = () => {
  return (
    <div className="ps-panel bg-white">
      <div className="ps-coverImage" style={{ backgroundImage : `url(${defaultCoverImage})` }}>
      </div>
      <div className="ps-content">
        <div className="d-flex">
          <img className="ps-avatar" src={logo}/>
          <div className="ps-info mt-2">
            <h5 className="mb-1">Mathin</h5>
            <span className="small">123456789</span>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2 small">
          <div>
            <div>
              PEEPS
            </div>
            <div>
              4
            </div>
          </div>
          <div>
            <div>
              FOLLOWING
            </div>
            <div>
              2
            </div>
          </div>
          <div>
            <div>
              FLLOWERS
            </div>
            <div>
              3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
