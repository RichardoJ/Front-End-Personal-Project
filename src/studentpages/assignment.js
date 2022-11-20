import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function Assignment(props) {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/assignment");
      const responseTwo = await fetch('/enrollment/1/student_course');

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseData = await response.json();
      const responseDataTwo = await responseTwo.json();

      setAssignment(responseData);
      setCourses(responseDataTwo);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    });

  }, []);

  if(loading){
    return<section className="mt-3" style={{textAlignVertical: "center",textAlign: "center"}}>
      <p>A moment please...</p>
    </section>
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
      <h1 className="mt-3" style={{ textAlignVertical: "center", textAlign: "center" }}>Assignment</h1>
      <div className="table-responsive mt-5">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Assignment Name</th>
              <th>Assignment Score</th>
              <th>Assignment Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.id}</td>
                <Link to={'/student/assignment/' + assignment.id} state={{assignmentName: assignment.assignment_name, assignmentId: assignment.id, assignmentDate: assignment.deadline, assignmentDetails: assignment.details}}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {assignment.assignment_name}
                  </td>
                </Link>
                {/* <td>{assignment.assignment_name}</td> */}
                <td>{assignment.assignment_score}</td>
                <td>{assignment.assignment_status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Assignment;
