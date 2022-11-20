import React from "react";
import Form from 'react-bootstrap/Form';
import { useLocation } from "react-router-dom";


function AssignmentStudentUpload(props) {
    const location = useLocation();
    const name = location.state.assignmentName;
    const details = location.state.assignmentDetails;
    const deadline = location.state.assignmentDate;
  return (
    <div className="m-3">
      <h2>{name}</h2>
      <hr/>
      <h4>Details : </h4>
      <p>{details}</p>
      <h4>Deadline : </h4>
      <p>{deadline}</p>
      <h4>UPLOAD : </h4>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
    </div>
  );
}

export default AssignmentStudentUpload;
