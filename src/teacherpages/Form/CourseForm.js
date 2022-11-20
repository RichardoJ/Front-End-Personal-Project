import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function CourseForm() {
  return (
    <Row className="mb-3">
      <Form>
        <Form.Group className="mb-3" controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Course name" />
        </Form.Group>

        <Form.Group as= {Col} className="mb-3" controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" placeholder="Enter Start Date" />
        </Form.Group>

        <Form.Group as= {Col} className="mb-3" controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="date" placeholder="Enter End Date" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCourseDetails">
          <Form.Label>Course Details</Form.Label>
          <Form.Control as="textarea" placeholder="Enter Course Details" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCourseLink">
          <Form.Label>Course Link</Form.Label>
          <Form.Control type="text" placeholder="Enter Course Link" />
        </Form.Group>

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

export default CourseForm;
