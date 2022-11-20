import { Button } from 'bootstrap';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import ProfileForm from './profileForm';
import classes from './userProfile.module.css';


const UserProfile = () => {
  
  const authCtx = useContext(AuthContext);

  const inputHandler = (event) => {
    event.preventDefault();

    fetch('/admin/student-claims/' + authCtx.token,{
      method: "POST"
    }).then((res) => {
      console.log("SUCCESS")
    });

    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDccKXMRv1RtSZ5zm--yE-kmPYBW7JGq9k";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem('signIn1'),
        password: localStorage.getItem('signIn2'),
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }else{
          return res.json().then((data) => {
            let errorMessage = "";
            if(data && data.error && data.error.message){
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.idToken);
      })

  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
      <button type='button' onClick={inputHandler}>Verify as A Student</button>
    </section>
  );
};

export default UserProfile;