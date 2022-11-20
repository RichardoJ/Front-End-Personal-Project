import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

function TeacherStudent() {
  const [students, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/student", {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseData = await response.json();

      setStudent(responseData);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    });
  }, []);

  if (loading) {
    return (
      <section
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        <p>A moment please...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        <p>{error}</p>
      </section>
    );
  }

  return (
    <div className="m-3">
      <Row>
        <Col sm={8}>
          <h1>Welcome to Student List</h1>
        </Col>
        <Col sm={4} className="d-flex justify-content-end">
          <Link to={"/studentform"}>
            <Button >Student Form</Button>
          </Link>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td style={{ whiteSpace: "nowrap" }}>{student.student_name}</td>
                <td>
                  <Button size="sm" color="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TeacherStudent;
