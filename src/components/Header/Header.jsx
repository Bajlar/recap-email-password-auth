import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className='nav-container w-50 mx-auto mb-3'>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/register-bs'>RegisterBS</Link>
      <Link to='/register-rbs'>RegisterRBS</Link>
    </nav>
  );
};

export default Header;