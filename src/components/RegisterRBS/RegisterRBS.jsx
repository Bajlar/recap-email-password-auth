import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterRBS = () => {
  const [email, setEmail] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = (event.target.email.value);
    const password = (event.target.password.value);
    console.log(email, password);
    setEmail(email);
  }

  return (
    <div className='w-50 mx-auto'>
      <h2 className="text-primary">Please Register !!!</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Accept Terms and Condition" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register-RBS
        </Button>
      </Form>
    </div>
  );
};

export default RegisterRBS;