import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StudentForm from "./Form/StudentForm";
// import { Route, Router, Routes } from "react-router-dom";
function TeacherHome() {
  return (
    <div className="ms-3 me-3">
      <h2
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Teacher's View
      </h2>
      <Row>
        <Col>
          <Link to={"/enrollmentform"}>
            <Button>Enrollment Form</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default TeacherHome;
