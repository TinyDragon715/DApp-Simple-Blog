import React, { useState } from 'react';
import { 
  Modal,
  ModalBody,
  ModalHeader,
  FormInput,
  FormTextarea,
  FormSelect,
  Row,
  Col ,
  Button
} from "shards-react";

const NewPeepModal = (props) => {
  return (
    <Modal open={props.open} toggle={props.toggle}>
      <ModalBody>
        <h5 className="modal-title">INCIDENT</h5>
        <h4>ADD SAFETY INCIDENT</h4>
        <p>
          Please enter the details around your safety incident. A detailed description will make it easier for others to tend and prevent.
        </p>
        <FormInput placeholder="Interesting title" />
        <FormTextarea size="lg" placeholder="Description" className="mt-2" />
        <FormTextarea size="lg" placeholder="Recommendations" className="mt-2" />
        <label className="mt-3">
          Select the category information that fits your incident
        </label>
        <Row>
          <Col md="6" sm="12">
            <FormSelect className="mt-1">
              <option>Select a serverity</option>
              <option>Select a serverity</option>
              <option>Select a serverity</option>
            </FormSelect>
          </Col> 
          <Col md="6" sm="12">
            <FormSelect className="mt-2">
              <option>Select a hazard</option>
              <option>Select a hazard</option>
              <option>Select a hazard</option>
            </FormSelect>
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12">
            <FormSelect className="mt-1">
              <option>Select a field</option>
              <option>Select a field</option>
              <option>Select a field</option>
            </FormSelect>
          </Col> 
          <Col md="6" sm="12">
            <FormSelect className="mt-2">
              <option>Select a division</option>
              <option>Select a division</option>
              <option>Select a division</option>
            </FormSelect>
          </Col>
        </Row>
        <div className="mt-3 text-right">
          <Button className="mt-2 px-4">
            Post
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default NewPeepModal;