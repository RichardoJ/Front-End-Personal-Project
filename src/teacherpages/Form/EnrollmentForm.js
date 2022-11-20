import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function EnrollmentForm() {
  return (
    <Row className="mb-3">
      <Form>
        <Form.Group className="mb-3" controlId="formStudentID">
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Student ID" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCourseID">
          <Form.Label>Course ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Course ID" />
        </Form.Group>

        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Row>
  );
}

export default EnrollmentForm;
