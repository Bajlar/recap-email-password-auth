import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
  const [errorLogin, setErrorLogin] = useState('');
  const [successLogin, setSuccessLogin] = useState('');
  const emailRef = useRef('');

  const handleFormLogin = (event) => {
    event.preventDefault();
    setErrorLogin();
    setSuccessLogin();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    // validation
    if(password.length < 6) {
      setErrorLogin('Please add 6 characters in your password');
      return;
    }

    signInWithEmailAndPassword(auth, email, password) 
    .then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      event.target.reset();
      if(!loggedUser.emailVerified) {
        alert('Wrong your email');
      }
      setSuccessLogin('User login successful');
    })
    .catch((error) => {
      console.error(error.message);
      setErrorLogin(error.message);
    })
  }

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if(!email) {
      alert('Please provide your email address to reset password');
      return;
    }
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Please check your email');
    })
    .catch((error) => {
      console.error(error.message);
    })
  }

  return (
    <div className='w-50 mx-auto'>
      <h2 className="text-primary">Please Login !!!</h2>
      <Form onSubmit={handleFormLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' placeholder="Password" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Accept Terms and Condition" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button> </small></p>
      <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
      <p className="text-danger">{errorLogin}</p>
      <p className="text-success">{successLogin}</p>
    </div>
  );
};

export default Login;