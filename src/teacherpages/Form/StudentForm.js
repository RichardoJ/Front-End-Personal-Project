import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import useInput from "../Hooks/use-input";

function StudentForm() {
  //Name
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput((value) => value.trim() !== "");

  //Address
  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddressInput
  } = useInput((value) => value.trim() !== "");

  //Email
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => value.includes('@'));

  //Password
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput
  } = useInput((value) => value.length >= 8);

  //Semester
  const {
    value: enteredSemester,
    isValid: enteredSemesterIsValid,
    hasError: semesterInputHasError,
    valueChangeHandler: semesterChangeHandler,
    inputBlurHandler: semesterBlurHandler,
    reset: resetSemesterInput
  } = useInput((value) => value > 0 && value < 12);


  //Check Form Validity
  let formIsValid = false;

  if (enteredNameIsValid && enteredAddressIsValid && enteredEmailIsValid && enteredPasswordIsValid && enteredPasswordIsValid && enteredSemesterIsValid) {
    formIsValid = true;
  }

  //Form Submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // if (!enteredNameIsValid) {
    //   return;
    // }

    const user = {
      student_name: enteredName,
      student_email: enteredEmail,
      student_password: enteredPassword,
      student_address: enteredAddress,
      student_semester: parseInt(enteredSemester)
    };

    fetch('/student/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    console.log(JSON.stringify(user));
    console.log("Name : " + enteredName);
    console.log("Address : " + enteredAddress);
    console.log("Email : " + enteredEmail);
    console.log("Password : " + enteredPassword);
    console.log("Semester : " + enteredSemester);

    resetNameInput()
    resetAddressInput()
    resetEmailInput()
    resetPasswordInput()
    resetSemesterInput()

  };

  

  return (
    <Row className="mb-3">
      <Form onSubmit={formSubmissionHandler}>
        <Form.Group className="mb-3" controlId="formStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && <p>Name must not be empty</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStudentEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && <p>Please enter a valid email</p>}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStudentPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && <p>Please enter a valid password with 8 characters or more</p>}
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="formStudentAddress">
          <Form.Label>Student Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student address"
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            value={enteredAddress}
          />
          {addressInputHasError && <p>Address must not be empty</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStudentSemester">
          <Form.Label>Semester</Form.Label>
          <Form.Control
            type="number"
            placeholder="Semester"
            onChange={semesterChangeHandler}
            onBlur={semesterBlurHandler}
            value={enteredSemester}
          />
          {semesterInputHasError && <p>Please enter a number</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
    </Row>
  );
}

export default StudentForm;
