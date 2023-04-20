import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegisterSubmit = (event) => {
    // console.log(event.target);
    // 1. prevent page refresh
    event.preventDefault();
    setSuccess('');
    setError('');

    // 2. collect form data
    const name = (event.target.name.value);
    const email = (event.target.email.value);
    const password = (event.target.password.value);
    console.log(name, email, password);

    // password validation
    if(!/(?=.*[A-Z])/.test(password)) {
      setError('Please add at least one uppercase letter');
      return;
    } else if(!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError('Please add at least two digit');
      return;
    } else if(password.length < 6) {
      setError('Please add at least 6 characters in your password');
      return;
    }

    // 3. create user in firebase email and password
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      setError('');
      event.target.reset();
      setSuccess('User has been create successfully');
      sendVerificationEmail(result.user);
      updateUserData(result.user, name);
    })
    .catch((error) => {
      console.error(error.message);
      setError(error.message);
    })
  }

  // email verification
  const sendVerificationEmail = (user) => {
    sendEmailVerification(user)
    .then((result) => {
      console.log(result);
      alert('Please verify your email password');
    })
  }

  // user name update
  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name
    })
    .then((result) => {
      console.log('user name update');
    })
    .catch((error) => {
      console.log(error.message);
      setError(error.message);
    })
  }

  const handleEmailChange = (event) => {
    const email = (event.target.value);
    // console.log(email);
  }

  // const handlePasswordChange = (event) => {
  //   const password = (event.target.value);
  //   console.log(password);
  //   setPassword(password);
  // }

  const handlePasswordBlur = (event) => {
    const password = (event.target.value);
    // console.log(password);
  }

  return (
    <div className='w-50 mx-auto'>
      <h2>Please Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input className='w-50 mb-4 p-2 rounded' type="name" name="name" id="name" placeholder='Your Name' required />
        <br />
        <input onChange={handleEmailChange} className='w-50 mb-4 p-2 rounded' type="email" name="email" id="email" placeholder='Your Email' required />
        <br />
        {/* <input onChange={handlePasswordChange} type="password" name="password" id="password" placeholder='Your Password' required /> */}
        <input onBlur={handlePasswordBlur} className='w-50 mb-4 p-2 rounded' type="password" name="password" id="password" placeholder='Your Password' required />
        <br />
        <input className='btn btn-primary' type="submit" value="Register" />
      </form>
      <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
      <p className='text-danger'>{setError}</p>
      <p className="text-success">{setSuccess}</p>
    </div>
  );
};

export default Register;