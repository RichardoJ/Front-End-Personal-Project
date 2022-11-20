import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import useInput from "../Hooks/use-input";

function ModuleForm() {
  //Name
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  //Details
  const {
    value: enteredDetails,
    isValid: enteredDetailsIsValid,
    hasError: detailsInputHasError,
    valueChangeHandler: detailsChangeHandler,
    inputBlurHandler: detailsBlurHandler,
    reset: resetDetailsInput,
  } = useInput((value) => value.trim() !== "");

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // if (!enteredNameIsValid) {
    //   return;
    // }

    const user = {
      Modules_name: enteredName,
      Modules_email: enteredDetails,
    };

    fetch("/modules/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    resetNameInput();
    resetDetailsInput();
  };

  return (
    <Row className="mb-3">
      <Form>
        <Form.Group className="mb-3" controlId="formModuleName">
          <Form.Label>Module Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Module name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && <p>Name must not be empty</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formModuleDetails">
          <Form.Label>Module Details</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Module Details"
            onChange={detailsChangeHandler}
            onBlur={detailsBlurHandler}
            value={enteredDetails}
          />
          {detailsInputHasError && <p>Details must not be empty</p>}
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Input Module Files here</Form.Label>
          <Form.Control type="file" multiple />
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

export default ModuleForm;
