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
    <div className="bg-gray">
      <label className="d-flex">
        <i 
          className="material-icons icon-redeem mr-2"
        >
          redeem
        </i>
        Send a tip to XXX
      </label>
      <div>
        <FormInput />
        <span className="small">
          Your tip amount and message will be public. Fees
        </span>
        <h5 className="text-center">
          5$
        </h5>
        <span className="small text-center">
          0.0015Eth
        </span>
      </div>
      <div className="text-center">
        <Button>
          Send tip
        </Button>
      </div>
    </div>
  );
}

export default SendTipPanel;