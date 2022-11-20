import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button, ButtonGroup } from "react-bootstrap";

function Modules() {
  const params = useParams();

  const [modules, setModules] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/modules/course/' + params.courseID);
      const responseTwo = await fetch('/modules/' + params.courseID + '/assignmentByCourse')

      if(!response.ok){
        throw new Error('Something Went Wrong!');
      }

      const responseData = await response.json();
      const responseDataTwo = await responseTwo.json();

      setModules(responseData);
      setAssignments(responseDataTwo);
      setLoading(false)
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    })
    
  }, []);

  if(loading){
    return <section className="mt-3" style={{textAlignVertical: "center",textAlign: "center"}}>
      <p>A moment please...</p>
    </section>
  }

  if(error){
    return <section className="mt-3" style={{textAlignVertical: "center",textAlign: "center"}}>
      <p>{error}</p>
    </section>
  }

  return (
    <div>
      <div>
        <h2 className="mt-3 ms-3">Modules</h2>
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Modules</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id}>
                  <td>{module.id}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {module.modules_name}
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="primary">
                        Edit
                      </Button>
                      <Button size="sm" color="danger">
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Modules;
