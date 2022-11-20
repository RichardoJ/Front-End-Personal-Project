import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import useInput from "../teacherpages/Hooks/use-input";
import classes from "./auth.module.css";

function AuthForm() {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authCtx = useContext(AuthContext);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  //Name
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  //Address
  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddressInput,
  } = useInput((value) => value.trim() !== "");

  //Password
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length >= 8);

  //Semester
  const {
    value: enteredSemester,
    isValid: enteredSemesterIsValid,
    hasError: semesterInputHasError,
    valueChangeHandler: semesterChangeHandler,
    inputBlurHandler: semesterBlurHandler,
    reset: resetSemesterInput,
  } = useInput((value) => value > 0 && value < 12);

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDccKXMRv1RtSZ5zm--yE-kmPYBW7JGq9k";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDccKXMRv1RtSZ5zm--yE-kmPYBW7JGq9k";
    }

    if (isLogin) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed!";
              // if(data && data.error && data.error.message){
              //   errorMessage = data.error.message;
              // }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log("MASUK PAK EKO")
          authCtx.login(data.idToken);
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("signIn1", enteredEmail);
          localStorage.setItem("signIn2", enteredPassword);
          fetch("/auth/login/" + enteredEmail, {
            method:"GET"
          }).then((res) => {
            if (res.ok) {
              console.log("BERHASIL PAK EKO")
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = "";
                if(data && data.error && data.error.message){
                  errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
              });
            }
          }).then((data) =>{
            if(data.role === "STUDENT"){
              navigate('/student/home');
              localStorage.setItem("idDB", data.ID);
              console.log("DATA ID :", data.ID);
            }else if(data.role === "TEACHER"){
              navigate('/teacher/home');
              localStorage.setItem("idDB", data.ID);
            }
          })
        })
        .catch((err) => {
          alert(err.message);
        });
     

    } else {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed!";
              // if(data && data.error && data.error.message){
              //   errorMessage = data.error.message;
              // }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCtx.login(data.idToken);
          console.log("Success");
          navigate("/student/home");
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("uid", data.localId);
          localStorage.setItem("signIn1", enteredEmail);
          localStorage.setItem("signIn2", enteredPassword);
          //Save the new user
          const user = {
            student_name: enteredName,
            student_email: enteredEmail,
            student_password: enteredPassword,
            student_address: enteredAddress,
            student_semester: parseInt(enteredSemester),
          };
          fetch('/student/', {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res2) => {
              setIsLoading(false);
              if (res2.ok) {
                console.log("saved to db");
                return res2.json();
              } else {
                return res2.json().then((data) => {
                  let errorMessage = "";
                  if(data && data.error && data.error.message){
                    errorMessage = data.error.message;
                  }
                  throw new Error(errorMessage);
                });
              }
            })
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
      {/* <form> */}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="Name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
            {nameInputHasError && (
              <p className={classes.error}>Name must no be empty</p>
            )}
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className={classes.error}>Please enter a valid email</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <p className={classes.error}>
              Please enter a valid password with 8 characters or more
            </p>
          )}
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="address">Your Address</label>
            <input
              type="text"
              id="address"
              required
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
              value={enteredAddress}
            />
            {addressInputHasError && (
              <p className={classes.error}>Address must not be empty</p>
            )}
          </div>
        )}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="semester">Your semester</label>
            <input
              type="number"
              id="semester"
              required
              onChange={semesterChangeHandler}
              onBlur={semesterBlurHandler}
              value={enteredSemester}
            />
            {semesterInputHasError && (
              <p className={classes.error}>Please enter a number</p>
            )}
          </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {/* {isLoggedIn && <p>Logged In Successfully</p>} */}
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
