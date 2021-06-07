import React, { useState } from 'react';
import { 
  Modal,
  ModalBody,
  FormInput,
  FormTextarea,
  FormSelect,
  Row,
  Col ,
  Button
} from "shards-react";

const SendTipPanel = (props) => {

  return (
    <div className="bg-gray tipPanel" onClick={props.preventClick}>
      <div className="position-relative">
        <label>
          <i 
            className="material-icons icon-redeem mr-2"
          >
            redeem
          </i>
          Send a tip to XXX
        </label>
        <span 
          className="icon-close"
          onClick={props.closeClick}
        >
          <i className="material-icons">
            close
          </i>
        </span>
      </div>
      <div>
        <FormInput />
        <span className="small">
          Your tip amount and message will be public. Fees
        </span>
        <h3 className="font-weight-bold mt-2 text-center mb-0">
          $5
        </h3>
        <div className="small text-center">
          0.0015Eth
        </div>
      </div>
      <div className="text-center mt-3">
        <Button>
          Send tip
        </Button>
      </div>
    </div>
  );
}

export default SendTipPanel;